# 💰 Balance Sheet Manager

A simple Balance Sheet Management web application built with **HTML, CSS, JavaScript, jQuery, Bootstrap, SweetAlert2, and SheetJS (XLSX)**.

The application allows users to manage debit and credit transactions, automatically calculate the current balance, store records in Local Storage, and import/export balance sheets as Excel files.

---

## ✨ Features

- ➕ Add Debit Transactions
- ➖ Add Credit Transactions
- 📊 Automatic Balance Calculation
- 💾 Save Transactions using Local Storage
- 📂 Import Balance Sheet from Excel (.xlsx/.xls)
- 📤 Export Balance Sheet to Excel (.xlsx)
- 🗑️ Clear All Transactions
- ⚠️ Input Validation
- 🔔 Beautiful Alerts using SweetAlert2
- 📱 Responsive UI with Bootstrap

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- jQuery
- Bootstrap 5
- SweetAlert2
- SheetJS (XLSX)

---

## 📸 Screenshots

> Add screenshots here after uploading them.

Example:

```
screenshots/
    home.png
    import.png
    export.png
```

Then use:

```md
![Home](screenshots/home.png)
```

---

## 📁 Project Structure

```
Balance-Sheet-Manager/
│
├── index.html
├── app.js
├── jquery-4.0.0.min.js
├── README.md
└── screenshots/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/your-username/Balance-Sheet-Manager.git
```

### Open the project

Simply open **index.html** in your browser.

No installation or build process is required.

---

## 📖 How to Use

### Add Transaction

1. Enter Description.
2. Enter Amount.
3. Positive value = Debit.
4. Negative value = Credit.
5. Click **Submit**.

---

### Export Data

Click the **Export** button to download your balance sheet as an Excel file.

---

### Import Data

Click the **Import** button and select an Excel (.xlsx/.xls) file.

---

### Clear Data

Click **Clear** to remove all transactions from Local Storage.

---

## 💾 Data Storage

All transactions are stored in the browser using **Local Storage**, so your data remains available even after refreshing the page.

---

## 📄 Excel Format

The imported Excel file should follow this structure:

| Description | Debit | Credit | Balance |
|------------|------:|-------:|--------:|
| Salary | 5000 | | 5000 |
| Shopping | | 500 | 4500 |

---

## ⚠️ Validation

The application prevents:

- Empty Description
- Empty Amount
- Amount = 0
- Credit greater than available balance
- Invalid inputs

---

## 🔮 Future Improvements

- Search Transactions
- Edit Transaction
- Delete Individual Transaction
- Dark Mode
- Date & Time for each transaction
- Transaction Categories
- Monthly Reports
- PDF Export
- Charts & Analytics
- User Authentication
- Cloud Database Support

---

## 👨‍💻 Author

**Muhammad Saim**

BS Software Engineering Student

GitHub: https://github.com/your-username

---

## 📜 License

This project is open-source and available under the **MIT License**.
