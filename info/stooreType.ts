interface userType {
  uuid: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_avatar?: string;
  user_date_created: string;
}

interface groupType {
  group_id: string;
  group_name: string;
  group_description?: string;
  group_image?: string;
  group_total_recipients?: number;
  group_created_by: string; // user uuid
  group_date_created: string;
}

// Item type base
// For general purposes
type studioItemConditionType = "new" | "used" | "refurbished";
type studioItemStatus = "broken" | "fixing" | "fixed" | "working" | "got_issue";
type qrType = "default" | "with_price";

interface itemFullType {
  item_id: number;
  item_name: string;
  item_created_by: string; // user uuid
  item_date_created: string;
  item_group?: string; // group id
  item_image?: string;
  item_qr_type?: qrType;
  item_qr_image?: string;
  item_description?: string;
  item_quantity?: number;
  item_condition?: studioItemConditionType;
  item_status?: studioItemStatus;
  item_status_description?: string;
  item_location?: string;
  item_serial_number?: string;
  item_availability?: boolean;
  item_alert?: boolean;
  item_alert_title?: string;
  item_alert_description?: string;
  item_alert_notification?: boolean;
  item_alert_notification_frequency?: string;
  item_brand?: number;
  item_price?: number;
  item_year?: number;
}

// Item type base
// For general purposes

interface itemBaseType {
  item_id: number;
  item_name: string;
  item_created_by: string; // user uuid
  item_date_created: string;
  item_group?: string; // group id
  item_image?: string;
  item_qr_image?: string;
  item_description?: string;
}

// For studio inventory management predefined template
// Enable user to track item availability, track status, track location, state item data, generate qr code

interface itemTypeStudio {
  item_profile: itemBaseType;
  item_quantity?: number;
  item_condition?: studioItemConditionType;
  item_status?: studioItemStatus;
  item_status_description?: string;
  item_location?: string;
  item_serial_number?: string;
  item_availability?: boolean;
  item_brand?: number;
  item_price?: number;
  item_year?: number;
}
