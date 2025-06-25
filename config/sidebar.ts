
import { BoxesIcon, BoxIcon, CalendarCheck, GaugeCircleIcon, PackageIcon } from "lucide-react"

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
        
    ]
}

export default sidebar_config