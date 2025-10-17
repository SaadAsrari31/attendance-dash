document.addEventListener("DOMContentLoaded", function () {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsPyaz03qLXlDsfSsgQX6Ix1xqfFFf0FaB_ku1Eqd1yr2iB6dJJxy8L1GSicg8eb4_1TxAmcmig8n4/pub?output=csv";

// <-- replace with your ID + sheet name

  fetch(sheetUrl)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("attendance-table");
      tbody.innerHTML = "";

      let presentCount = 0;
      let absentCount = 0;

      data.forEach(row => {
        if (!row.Name) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.Name}</td>
          <td>${row.Date}</td>
          <td>${row.Time}</td>
          <td class="${row.Status.toLowerCase()}">${row.Status}</td>
        `;
        tbody.appendChild(tr);

        if (row.Status === "Present") presentCount++;
        else if (row.Status === "Absent") absentCount++;
      });

      document.getElementById("total").textContent = data.length;
      document.getElementById("present").textContent = presentCount;
      document.getElementById("absent").textContent = absentCount;
    })
    .catch(err => console.error("Error fetching sheet:", err));
});
