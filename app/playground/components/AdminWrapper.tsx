"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AdminWrapper({ children }: { children: React.ReactNode }) {
  const [clickCount, setClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleClick = () => {
    console.log(clickCount);
    let newCount = clickCount + 1;
    if (newCount === 5) {
      setClickCount(0);
      setShowPasswordModal(true);
    } else {
      setClickCount(newCount);
    }
  };

  return (
    <>
      <div onClick={handleClick}>{children}</div>
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger> */}
        <DialogContent className="w-[80vw] max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Input Admin Password</DialogTitle>
            <DialogDescription>
              Input your password to make changes.
            </DialogDescription>
          </DialogHeader>

          <Input type="password" className="my-4 w-full" />

          <DialogFooter>
            <Button type="submit">Enter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminWrapper;
