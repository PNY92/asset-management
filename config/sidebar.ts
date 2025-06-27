
import { BoxesIcon, BoxIcon, CalendarCheck, GaugeCircleIcon, PackageIcon, Users } from "lucide-react"

const sidebar_config = {
    "headerLabel": "Testing Portal",
    "items": [
        {
            "label": "Dashboard",
            "path": "/dashboard",
            "icon": GaugeCircleIcon
        },
        {
            "label": "Inventory",
            "path": "/inventory",
            "icon": PackageIcon
        },
        {
            "label": "Booking",
            "path": "/booking",
            "icon": CalendarCheck
        }
        
    ],
    "protected_items" : [
        {
            "label": "Users",
            "path": "/users",
            "icon": Users
        }
    ]
}

export default sidebar_config