# Room Rental API - Postman Collection

**Base URL:** `http://localhost:8080`

**Authentication:** JWT Token (Bearer Token)
- Sau khi login, copy token từ response và thêm vào header: `Authorization: Bearer {token}`

---

## 🔐 Authentication APIs

### 1. Register
**POST** `/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "landlord1",
  "password": "password123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "role": "LANDLORD"
}
```

**Response:** 200 OK
```json
{
  "id": 1,
  "username": "landlord1",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "role": "LANDLORD"
}
```

**Note:** Role có thể là: `ADMIN`, `LANDLORD`, `TENANT`

---

### 2. Login
**POST** `/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "username": "landlord1",
  "password": "password123"
}
```

**Response:** 200 OK
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "userId": 1,
  "username": "landlord1",
  "role": "LANDLORD"
}
```

**⚠️ Copy token này để dùng cho các API khác!**

---

### 3. Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
{
  "id": 1,
  "username": "landlord1",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "0123456789",
  "role": "LANDLORD"
}
```

---

## 🏠 Property APIs

### 4. Create Property
**POST** `/api/properties`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Căn hộ đẹp tại Quận 1",
  "description": "Căn hộ rộng rãi, đầy đủ tiện nghi, gần trung tâm",
  "price": 5000000,
  "area": 50.5,
  "address": "123 Nguyễn Huệ, Quận 1, TP.HCM",
  "amenities": "Wifi, Điều hòa, Tủ lạnh, Máy giặt",
  "districtId": 1,
  "categoryId": 1,
  "imageUrls": [
    "https://res.cloudinary.com/dpk7200/image/upload/v1234567890/property1.jpg"
  ]
}
```

**Response:** 201 Created
```json
{
  "id": 1,
  "title": "Căn hộ đẹp tại Quận 1",
  "description": "Căn hộ rộng rãi, đầy đủ tiện nghi, gần trung tâm",
  "price": 5000000,
  "area": 50.5,
  "address": "123 Nguyễn Huệ, Quận 1, TP.HCM",
  "amenities": "Wifi, Điều hòa, Tủ lạnh, Máy giặt",
  "status": 1,
  "district": { "id": 1, "name": "Quận 1" },
  "category": { "id": 1, "name": "Căn hộ" },
  "owner": { "id": 1, "username": "landlord1", "fullName": "John Doe" },
  "images": []
}
```

---

### 5. Update Property
**PUT** `/api/properties/{id}`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**URL Parameters:**
- `id`: Property ID (e.g., 1)

**Body (JSON):**
```json
{
  "title": "Căn hộ đẹp tại Quận 1 - Updated",
  "description": "Căn hộ rộng rãi, đầy đủ tiện nghi, gần trung tâm - Mới sửa chữa",
  "price": 5500000,
  "area": 50.5,
  "address": "123 Nguyễn Huệ, Quận 1, TP.HCM",
  "amenities": "Wifi, Điều hòa, Tủ lạnh, Máy giặt, Bếp",
  "districtId": 1,
  "categoryId": 1,
  "imageUrls": []
}
```

**Response:** 200 OK
```json
{
  "id": 1,
  "title": "Căn hộ đẹp tại Quận 1 - Updated",
  ...
}
```

---

### 6. Delete Property
**DELETE** `/api/properties/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: Property ID (e.g., 1)

**Response:** 204 No Content

---

### 7. Get Property by ID
**GET** `/api/properties/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: Property ID (e.g., 1)

**Response:** 200 OK
```json
{
  "id": 1,
  "title": "Căn hộ đẹp tại Quận 1",
  "description": "Căn hộ rộng rãi, đầy đủ tiện nghi, gần trung tâm",
  "price": 5000000,
  "area": 50.5,
  "address": "123 Nguyễn Huệ, Quận 1, TP.HCM",
  "amenities": "Wifi, Điều hòa, Tủ lạnh, Máy giặt",
  "status": 1,
  "district": { "id": 1, "name": "Quận 1" },
  "category": { "id": 1, "name": "Căn hộ" },
  "owner": { "id": 1, "username": "landlord1", "fullName": "John Doe" },
  "images": []
}
```

---

### 8. Search Properties
**GET** `/api/properties`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters (all optional):**
- `q`: Search keyword (e.g., "căn hộ")
- `districtId`: District ID (e.g., 1)
- `categoryId`: Category ID (e.g., 1)
- `minPrice`: Minimum price (e.g., 3000000)
- `maxPrice`: Maximum price (e.g., 10000000)

**Examples:**
```
GET /api/properties
GET /api/properties?q=căn hộ
GET /api/properties?districtId=1&categoryId=1
GET /api/properties?minPrice=3000000&maxPrice=10000000
GET /api/properties?q=căn hộ&districtId=1&minPrice=3000000&maxPrice=10000000
```

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "title": "Căn hộ đẹp tại Quận 1",
    "price": 5000000,
    ...
  },
  {
    "id": 2,
    "title": "Nhà trọ giá rẻ",
    "price": 2000000,
    ...
  }
]
```

---

## 📅 Booking APIs

### 9. Create Booking
**POST** `/api/bookings`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "propertyId": 1,
  "bookingDate": "2024-12-25T10:00:00",
  "note": "Tôi muốn xem phòng vào buổi sáng"
}
```

**Response:** 201 Created
```json
{
  "id": 1,
  "propertyId": 1,
  "propertyTitle": "Căn hộ đẹp tại Quận 1",
  "tenant": {
    "id": 2,
    "username": "tenant1",
    "fullName": "Jane Smith"
  },
  "bookingDate": "2024-12-25T10:00:00",
  "status": "PENDING",
  "note": "Tôi muốn xem phòng vào buổi sáng",
  "createdAt": "2024-12-20T08:00:00"
}
```

**Note:** `bookingDate` format: `yyyy-MM-ddTHH:mm:ss` (ISO 8601)

---

### 10. Update Booking Status
**PUT** `/api/bookings/{id}/status`

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**URL Parameters:**
- `id`: Booking ID (e.g., 1)

**Body (JSON):**
```json
{
  "action": "APPROVE"
}
```

**Or:**
```json
{
  "action": "REJECT"
}
```

**Response:** 200 OK
```json
{
  "id": 1,
  "propertyId": 1,
  "propertyTitle": "Căn hộ đẹp tại Quận 1",
  "tenant": {
    "id": 2,
    "username": "tenant1",
    "fullName": "Jane Smith"
  },
  "bookingDate": "2024-12-25T10:00:00",
  "status": "APPROVED",
  "note": "Tôi muốn xem phòng vào buổi sáng",
  "createdAt": "2024-12-20T08:00:00"
}
```

**Note:** 
- Chỉ owner của property mới có thể update status
- Action có thể là: `APPROVE`, `REJECT`, hoặc `REJECTED`

---

### 11. Get Bookings for Owner
**GET** `/api/bookings/owner`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "propertyId": 1,
    "propertyTitle": "Căn hộ đẹp tại Quận 1",
    "tenant": {
      "id": 2,
      "username": "tenant1",
      "fullName": "Jane Smith"
    },
    "bookingDate": "2024-12-25T10:00:00",
    "status": "PENDING",
    "note": "Tôi muốn xem phòng vào buổi sáng",
    "createdAt": "2024-12-20T08:00:00"
  }
]
```

---

### 12. Get Bookings for Tenant
**GET** `/api/bookings/tenant`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "propertyId": 1,
    "propertyTitle": "Căn hộ đẹp tại Quận 1",
    "tenant": {
      "id": 2,
      "username": "tenant1",
      "fullName": "Jane Smith"
    },
    "bookingDate": "2024-12-25T10:00:00",
    "status": "PENDING",
    "note": "Tôi muốn xem phòng vào buổi sáng",
    "createdAt": "2024-12-20T08:00:00"
  }
]
```

---

## 📋 Reference Data APIs

### 13. Get All Categories
**GET** `/api/categories`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "name": "Căn hộ"
  },
  {
    "id": 2,
    "name": "Nhà trọ"
  },
  {
    "id": 3,
    "name": "Phòng trọ"
  }
]
```

---

### 14. Get All Districts
**GET** `/api/districts`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "name": "Quận 1"
  },
  {
    "id": 2,
    "name": "Quận 2"
  },
  {
    "id": 3,
    "name": "Quận 3"
  }
]
```

---

## 🔧 Postman Setup Tips

### 1. Environment Variables
Tạo environment trong Postman với các biến:
- `base_url`: `http://localhost:8080`
- `token`: (sẽ được set sau khi login)

### 2. Pre-request Script (cho các API cần auth)
```javascript
// Tự động thêm token vào header
if (pm.environment.get("token")) {
    pm.request.headers.add({
        key: "Authorization",
        value: "Bearer " + pm.environment.get("token")
    });
}
```

### 3. Test Script (cho Login API)
```javascript
// Tự động lưu token sau khi login
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.environment.set("token", jsonData.token);
        console.log("Token saved:", jsonData.token);
    }
}
```

### 4. Collection Structure
Tổ chức collection theo thư mục:
```
📁 Room Rental API
  📁 Authentication
    - Register
    - Login
    - Get Current User
  📁 Properties
    - Create Property
    - Update Property
    - Delete Property
    - Get Property by ID
    - Search Properties
  📁 Bookings
    - Create Booking
    - Update Booking Status
    - Get Owner Bookings
    - Get Tenant Bookings
  📁 Reference Data
    - Get Categories
    - Get Districts
```

---

## ⚠️ Error Responses

Tất cả các lỗi sẽ trả về format:

```json
{
  "timestamp": "2024-12-20T10:30:00",
  "code": 404,
  "message": "Property not found",
  "path": "/api/properties/999"
}
```

**Common Error Codes:**
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

---

## 📝 Notes

1. **Authentication:** Tất cả API (trừ `/api/auth/**`) đều yêu cầu JWT token
2. **Token Format:** `Authorization: Bearer {token}`
3. **Date Format:** ISO 8601 format: `yyyy-MM-ddTHH:mm:ss`
4. **Price:** Giá tiền tính bằng VNĐ (Long type)
5. **Role:** `ADMIN`, `LANDLORD`, `TENANT`
6. **Booking Status:** `PENDING`, `APPROVED`, `REJECTED`

