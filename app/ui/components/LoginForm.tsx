"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { FaArrowRightLong } from "react-icons/fa6";
import { EnhancedButton } from "@/components/ui/enhanced-btn";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import { useAuth } from "@/app/context/useAuth";
import { toast } from "sonner";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);

    toast.promise(() => login(email, password), {
      loading: "Logging in...",
      success: (data) => {
        return "Login Successful! 🎉 ";
      },
      error: (error) => {
        console.log(error);
        return "Login failed, please try again";
      },
    });

    setLoading(false);
  };

  return (
    <motion.div
      className="mt-6 flex w-full max-w-[24rem] flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <Input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={handleEmailChange}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <Input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <EnhancedButton
          variant="expandIcon"
          Icon={FaArrowRightLong}
          onClick={handleLogin}
          iconPlacement="right"
          className="mt-2 w-full"
          disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </EnhancedButton>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="mt-4 flex w-full items-center justify-center gap-1 text-muted-foreground">
        <p>Need help? Reach out on </p>
        <Link
          href="https://x.com/cartebytes"
          rel="noopener noreferrer"
          target="_blank">
          <FaXTwitter className="h-4 w-4 transition-all duration-200 ease-linear hover:text-yellow-200" />
        </Link>
        or
        <Link
          href="https://instagram.com/cartebytes"
          rel="noopener noreferrer"
          target="_blank">
          <FaInstagram className="ml-0.5 h-5 w-5 transition-all duration-200 ease-linear hover:text-yellow-200" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
