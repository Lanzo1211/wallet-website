let currentBalance = 24850.50;
let isBalanceHidden = false;
let transactions = [
  {
    id: 1,
    title: "Transfer to Abebe",
    phone: "+251900000060",
    type: "out",
    amount: 500.00,
    time: "Today, 11:20 AM"
  },
  {
    id: 2,
    title: "Received from Dr alemu",
    phone: "+251900000002",
    type: "in",
    amount: 2500.00,
    time: "Yesterday"
  },
  {
    id: 3,
    title: "Ethio Airtime",
    phone: "+251900000001",
    type: "out",
    amount: 100.00,
    time: "20 Oct 2026"
  }
];
const balanceDisplay = document.getElementById("balance-display");
const toggleBalanceBtn = document.getElementById("toggle-balance-btn");
const eyeIcon = document.getElementById("eye-icon");
const transactionList = document.getElementById("transaction-list");
const copyPhoneBtn = document.getElementById("copy-phone-btn");

document.addEventListener("DOMContentLoaded", () => {
  renderBalance();
  renderTransactions();
  setupEventListeners();
});

function setupEventListeners() {
  toggleBalanceBtn.addEventListener("click", () => {
    isBalanceHidden = !isBalanceHidden;
    renderBalance();
  });

  copyPhoneBtn.addEventListener("click", () => {
    copyToClipboard("+2519000001");
  });

  document.getElementById("send-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const phone = document.getElementById("recipient-phone").value.trim();
    const amount = parseFloat(document.getElementById("send-amount").value);
    const note = document.getElementById("send-note").value.trim();

    if (amount > currentBalance) {
      showToast("Insufficient balance!");
      return;
    }

    currentBalance -= amount;
    transactions.unshift({
      id: Date.now(),
      title: note ? `Sent: ${note}` : `Transfer to +251${phone}`,
      phone: `+251${phone}`,
      type: "out",
      amount: amount,
      time: "Just now"
    });

    renderBalance();
    renderTransactions();
    closeModal("send-modal");
    e.target.reset();
    showToast(`ETB ${amount.toFixed(2)} sent successfully!`);
  });
  document.getElementById("airtime-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("airtime-amount").value);
    const phone = document.getElementById("airtime-phone").value.trim();

    if (amount > currentBalance) {
      showToast("Insufficient balance!");
      return;
    }

    currentBalance -= amount;
    transactions.unshift({
      id: Date.now(),
      title: `Airtime for +251${phone}`,
      phone: `+251${phone}`,
      type: "out",
      amount: amount,
      time: "Just now"
    });

    renderBalance();
    renderTransactions();
    closeModal("airtime-modal");
    e.target.reset();
    showToast(`ETB ${amount.toFixed(2)} airtime recharged!`);
  });
  document.getElementById("bill-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const billType = document.getElementById("bill-type").value;
    const amount = parseFloat(document.getElementById("bill-amount").value);

    if (amount > currentBalance) {
      showToast("Insufficient balance!");
      return;
    }

    currentBalance -= amount;
    transactions.unshift({
      id: Date.now(),
      title: `${billType}`,
      phone: "Utility Bill",
      type: "out",
      amount: amount,
      time: "Just now"
    });

    renderBalance();
    renderTransactions();
    closeModal("bills-modal");
    e.target.reset();
    showToast(`Bill paid successfully!`);
  });
}
function renderBalance() {
  if (isBalanceHidden) {
    balanceDisplay.textContent = "••••••••";
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    balanceDisplay.textContent = currentBalance.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach((tx) => {
    const isIncome = tx.type === "in";
    const li = document.createElement("li");
    li.className = "tx-item";
    li.innerHTML = `
      <div class="tx-left">
        <div class="tx-icon-wrap ${isIncome ? 'tx-incoming' : 'tx-outgoing'}">
          <i class="fa-solid ${isIncome ? 'fa-arrow-down-left' : 'fa-arrow-up-right'}"></i>
        </div>
        <div>
          <div class="tx-title">${tx.title}</div>
          <div class="tx-time">${tx.time}</div>
        </div>
      </div>
      <div class="tx-amount ${isIncome ? 'amount-plus' : 'amount-minus'}">
        ${isIncome ? '+' : '-'} ETB ${tx.amount.toFixed(2)}
      </div>
    `;
    transactionList.appendChild(li);
  });
}
function openModal(id) {
  document.getElementById(id).classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

function setAirtimeAmount(val) {
  document.getElementById("airtime-amount").value = val;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Phone number copied to clipboard!");
  }).catch(() => {
    showToast("Copied!");
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = "toast show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2500);
}