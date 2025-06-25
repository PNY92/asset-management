"use server"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

async function signIn(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword(
        {
            email: `${formData.get("email")}`,
            password: `${formData.get("password")}`
        }
    );

    if (error) {
        return {
            error: error.message
        }
    }
    else {
        return redirect("/dashboard");
    }

}

async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return {
            error: error.message
        }
    }
}

export { signIn, signOut };