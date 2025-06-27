"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../ui/button"
import { createAsset } from "@/src/app/actions/asset"
import { toast } from "sonner"

function CreateAssetForm() {

    function handleFormAction(formData : FormData) {
        async function submitForm() {
            const response = await createAsset(formData);

            if (response?.error) {
                toast.error("Error",
                    {description: response.error}
                )
            }
            if (response?.success) {
                toast.success("Success", 
                    {description: response.success}
                )
            }
        }
        submitForm();
    }

    return (
        <>
            <div>
                <form action={handleFormAction}>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1 mb-2">
                            <Label className="text-md">
                                Creating Asset
                            </Label>
                            <div className="text-muted-foreground text-sm">
                                Creating asset goes easy! Just provide information to the below input boxes
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>
                                Display Name
                            </Label>
                            <Input type="text" required name="display_name" className="w-sm"></Input>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>
                                Category
                            </Label>
                            <Input type="text" required name="category" className="w-sm"></Input>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>
                                Model
                            </Label>
                            <Input type="text" required name="model" className="w-sm"></Input>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>
                                Asset Tag
                            </Label>
                            <Input type="text" name="asset_tag" className="w-sm"></Input>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label>
                                Status
                            </Label>
                            <Select name="status">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a status"></SelectValue>
                                </SelectTrigger>
                                <SelectContent side="right">
                                    <SelectGroup>
                                        <SelectLabel>
                                            Status
                                        </SelectLabel>
                                        <SelectItem value="STATUS_READY">Ready to Deploy</SelectItem>
                                        <SelectItem value="STATUS_DEPLOYED">Deployed</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mt-4">
                            <Button type="submit">Submit</Button>
                        </div>

                    </div>


                </form>
            </div>
        </>
    )
}

export {CreateAssetForm}