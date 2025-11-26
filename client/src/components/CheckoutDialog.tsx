import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

    // 1. تجهيز نص تفاصيل الطلب
    const itemsList = items
      .map(item => `• ${item.name} (Qty: ${item.quantity})`)
      .join("\n");

    const fullOrderDetails = `
Customer Phone: ${data.phone}
Address: ${data.address}
Notes: ${data.notes || "None"}

--- Products ---
${itemsList}
    `.trim();

    // 2. تجهيز البيانات (تأكدنا من إغلاق الأقواس بشكل صحيح)
    const templateParams = {
      order_id: Date.now(),
      orders: fullOrderDetails,
      image_url: items[0]?.image || "",
      name: data.name,
      units: items.reduce((acc, item) => acc + item.quantity, 0),
      price: 0,
      cost: total.toFixed(2),
      email: data.email,
    };

    try {
      // ⚠️ استبدل YOUR_PUBLIC_KEY بالمفتاح الخاص بك وتأكد من وجود علامات الاقتباس حوله
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
            <Input id="name" placeholder="Your Name" {...register("name", { required: "Name is required" })} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="079xxxxxxx" {...register("phone", { required: "Phone is required" })} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Input id="address" placeholder="City, Area, Street..." {...register("address", { required: "Address is required" })} />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input id="notes" placeholder="Any special instructions?" {...register("notes")} />
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
