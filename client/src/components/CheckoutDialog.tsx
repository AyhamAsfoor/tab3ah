import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
}

export function CheckoutDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, total, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    const shipping = items.length > 0 ? 10 : 0;
    const tax = 0;
    const grandTotal = total + shipping + tax;

    // الحصول على رابط الموقع الأساسي لتحويل صور المنتجات إلى روابط كاملة
    // لأن برامج الإيميل لا تفهم الروابط المحلية مثل /images/item.jpg
    const baseUrl = window.location.origin;

    const templateParams = {
      order_id: Date.now(),
      email: data.email,
      
      // هنا السر: نرسل قائمة المنتجات كـ Array ليعمل التكرار {{#orders}} في القالب
      orders: items.map(item => ({
        name: item.name,
        units: item.quantity,
        price: item.price.toFixed(2),
        // تحويل الرابط إلى رابط كامل: https://ayhamasfoor.github.io/tab3ah/images/...
        image_url: item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`
      })),

      // كائن التكلفة ليعمل {{cost.total}} و {{cost.shipping}}
      cost: {
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: grandTotal.toFixed(2)
      },

      // بيانات إضافية (اختياري)
      customer_name: data.name,
      customer_phone: data.phone,
      customer_address: data.address
    };

    try {
      // ⚠️ استبدل هذا بمفتاحك العام الحقيقي
      await emailjs.send(
        "service_a03pg51", 
        "template_p9url3b", 
        templateParams, 
        "P4XREttXNUOkgEMSh" 
      );

      toast.success("Order sent successfully!");
      clearCart();
      setOpen(false);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-accent text-white py-6 text-lg">
          Checkout Now (${total.toFixed(2)})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <input 
              id="name" 
              className={inputClass}
              placeholder="Your Name" 
              {...register("name", { required: "Name is required" })} 
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <input 
              id="email" 
              type="email" 
              className={inputClass}
              placeholder="you@example.com" 
              {...register("email", { required: "Email is required" })} 
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <input 
              id="phone" 
              type="tel" 
              className={inputClass}
              placeholder="079xxxxxxx" 
              {...register("phone", { required: "Phone is required" })} 
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <input 
              id="address" 
              className={inputClass}
              placeholder="City, Area, Street..." 
              {...register("address", { required: "Address is required" })} 
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <input 
              id="notes" 
              className={inputClass}
              placeholder="Any special instructions?" 
              {...register("notes")} 
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending Order..." : "Confirm Order"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
