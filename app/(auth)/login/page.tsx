import { LoginForm } from "@/components/custom/login_form";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


function LoginPage() {
    
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
    );
}

export default LoginPage;