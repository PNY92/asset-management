
"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect } from "react"
import { signIn } from "@/src/app/actions/auth"
import { toast } from "sonner"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [state, formAction, pending] = useActionState(signIn, null);

    useEffect(() => {
        console.log(state?.error)
       if (state?.error) {
        toast.error("Login failed", {
            description: state.error
        })
       } 
    }, [state])
    
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" name="password" required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" disabled={pending} className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}
