# 📚 Personalize Your English Journey

## 📝 Tổng quan về dự án

**Personalize Your English Journey** là một hệ thống học từ vựng tiếng Anh tích hợp Trí tuệ nhân tạo (AI) 🧠.Dự án giúp người học:

- Truyền cảm hứng học tập ✨
- Tiết kiệm thời gian ⏳
- Tự động cung cấp các từ vựng liên quan đến chủ đề mà người học thực sự quan tâm ❤️

---

## 🛠 Công nghệ sử dụng

- **MERN Stack** (MongoDB, Express.js, React.js, Node.js) 🌟
- **React Front-end** kết hợp với thư viện **Material-UI (MUI)**.

---

## 🎯 Thuật toán đánh giá mức độ phát âm

Sử dụng thuật toán **Levenshtein Distance** để kiểm tra độ chính xác phát âm.

- Levenshtein Distance đo khoảng cách giữa 2 chuỗi ký tự bằng cách đếm số lần:
  - ✏️ Chèn ký tự
  - 🗑️ Xóa ký tự
  - 🔁 Thay thế ký tự

**Ví dụ minh họa:**

#### Bước 1: Tính Levenshtein Distance

| Chuỗi 1 | Chuỗi 2 |        Các bước chỉnh sửa        | Levenshtein Distance |
| :------: | :------: | :-----------------------------------: | :------------------: |
|  kitten  | sitting | kitten → sitten → sittin → sitting |          3          |

#### Bước 2: Tính % độ giống nhau

```
Similarity Percentage = (1 - (Levenshtein Distance / Max Length of Two Strings)) × 100 = (1 - 3 / 7) * 100 = 57.14% 
```

✨ Kết luận: `kitten` và `sitting` giống nhau **57.14%**.
----------------------------------------

## 🚀 Các tính năng chính

### 👤 Quản lý tài khoản

- 🔐 Đăng nhập / Đăng ký tài khoản

### 🧩 Quản lý chủ đề

- ➕ Tạo chủ đề mới, tự sinh từ vựng từ phù hợp với chủ đề
- 📝 Tạo đề kiểm tra tự động dựa trên từ vựng của chủ đề

### 📖 Luyện tập

- 🃏 Học từ vựng qua **FlashCard**
- ❓ Trả lời **Câu hỏi trắc nghiệm**
- 🎤 **Luyện tập phát âm** thông qua thuật toán

### 📝 Làm bài kiểm tra

- 🖊️ Thực hiện bài kiểm tra
- 🗂️ Xem lịch sử các bài kiểm tra đã làm

### 📊 Theo dõi tiến độ

- 📈 Thống kê lịch sử luyện tập từ vựng
- 🎯 Lưu lịch sử luyện tập phát âm
- 🧠 Lưu lịch sử trả lời câu hỏi trắc nghiệm

---

## 🌟 Slide trình bày

[Slide](https://www.canva.com/design/DAGQO4HAvuM/8bxUeE5Pu-BQHxO-tM0jBA/edit?utm_content=DAGQO4HAvuM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---
