# API Documentation 

## Autentikasi

Semua endpoint memerlukan header `x-api-key` yang valid.

**Contoh Header:**
```http
x-api-key: your_api_key_here
```

Jika API key tidak disertakan atau salah, server akan mengembalikan status `401 Unauthorized`.

---

## Endpoint

### 1. **Get Conversations**
**GET** `/conversations`  
Menampilkan daftar conversation dengan pagination & filter.

**Query params**
- `page` *(number, default: 1)* — halaman.
- `limit` *(number, default: 10, max: 100)* — jumlah item per halaman.
- `q` *(string, optional)* — pencarian teks pada `last_messages` (case-insensitive).
- `sort` *(enum: `id|created_at|updated_at`, default: `id`)* — kolom untuk pengurutan.
- `order` *(enum: `asc|desc`, default: `desc`)* — arah pengurutan.

**Response:**
```json
{
  "meta": {
    "total": 3,
    "per_page": 20,
    "current_page": 1,
    "last_page": 1,
    "first_page": 1,
    "first_page_url": "/?page=1",
    "last_page_url": "/?page=1",
    "next_page_url": null,
    "previous_page_url": null
  },
  "data": [
    {
      "id": 1,
      "session_id": "uuid",
      "last_messages": "Jawaban terakhir bot",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

---


### 2. **Get Conversation Detail**
**GET** `/conversations/:id`  
Menampilkan detail satu conversation beserta semua pesan.

**Response:**
```json
{
  "id": 1,
  "session_id": "uuid",
  "last_messages": "Jawaban terakhir bot",
  "messages": [
    {
      "id": 1,
      "sender_type": "user",
      "conversation_id": 1,
      "message": "Halo bot!"
    },
    {
      "id": 2,
      "sender_type": "bot",
      "conversation_id": 1,
      "message": "Halo! Ada yang bisa dibantu?"
    }
  ]
}
```

---

### 3. **Delete Conversation**
**DELETE** `/conversations/:id`  
Menghapus satu conversation beserta seluruh pesan terkait.

**Response:**
```json
{
  "message": "Conversation sukses delete"
}
```

---

### 4. **Delete Message**
**DELETE** `/messages/:id`  
Menghapus pesan tertentu.

**Response:**
```json
{
  "message": "Message sukses delete"
}
```

---

### 5. **Kirim Pertanyaan**
**POST** `/questions`  
Mengirim pertanyaan ke bot Majadigi dan menyimpan hasilnya di database.

**Body Params:**
| Field       | Tipe   | Wajib | Deskripsi                                   |
|-------------|--------|-------|---------------------------------------------|
| question    | string | Ya    | Pertanyaan pengguna                         |
| session_id  | string | Tidak | Jika tidak ada, akan dibuat otomatis (UUID) |

**Contoh Request:**
```json
{
  "question": "Apa itu Majadigi?"
}
```

**Contoh Response:**
```json
{
  "session_id": "8b8f8c7e-1234-4a56-b89a-abc123def456",
  "conversation_id": 1,
  "question_message_id": 1,
  "answer_message_id": 2,
  "answer": "Majadigi adalah layanan publik Provinsi Jawa Timur...",
  "statusCode": 200
}
```

---

## Instalasi
1. Clone repo ini.
2. Install dependencies:
```bash
npm install
```
3. Copy `.env.example` ke `.env` dan isi variabel koneksi database & auth api key
```
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=postgres
PG_DB_NAME=chatdb
API_KEY=supersecret
```
4. Jalankan migrasi:
```bash
node ace migration:run
```
5. Jalankan server:
```bash
node ace serve --watch
```

---

---
