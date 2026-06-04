# Quy trình làm việc (Workflow Rules)

> File này được đọc đầu mỗi phiên làm việc. TUÂN THỦ NGHIÊM NGẶT.

---

## 1. Checkpoint (bắt buộc)

**Trước khi code bất kỳ chức năng nào**, phải tạo checkpoint git:

```bash
# Nếu chưa có git repo
git init

# Commit checkpoint
git add .
git commit -m "checkpoint: <mô tả ngắn gọn trạng thái trước khi code>"
```

- Mỗi chức năng lớn = một checkpoint riêng
- Nếu chưa commit, KHÔNG ĐƯỢC code

## 2. Plan trước khi code (bắt buộc)

Trước mỗi chức năng hoặc bước trong chức năng:

1. Viết **plan chi tiết** gồm:
   - Mục tiêu
   - Các file sẽ tạo/sửa
   - Nội dung chính từng file
   - Cách kiểm tra kết quả
2. Trình bày plan cho user

## 3. Xin phép (bắt buộc)

- Sau khi trình bày plan, **đợi user đồng ý**
- Chỉ khi user nói "OK", "Yes", "được", "có", "execute" hoặc tương đương thì mới được code
- Với mỗi bước trong chức năng, cũng phải xin phép nếu cần thay đổi quan trọng

## 4. Cam kết

- Đầu mỗi phiên, đọc lại file này
- Nếu user yêu cầu bỏ qua quy trình, ghi lại lý do vào commit message
