document.addEventListener("DOMContentLoaded", function () {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsPyaz03qLXlDsfSsgQX6Ix1xqfFFf0FaB_ku1Eqd1yr2iB6dJJxy8L1GSicg8eb4_1TxAmcmig8n4/pub?output=csv";

  function fetchAttendance() {
    const tbody = document.getElementById("attendance-table");

    fetch(sheetUrl)
      .then(response => response.text())
      .then(csvText => {
        const data = Papa.parse(csvText, { header: true }).data;

        tbody.innerHTML = "";
        let presentCount = 0;
        let absentCount = 0;
        let validRows = 0;

        data.forEach(row => {
          const name = row["Name"] || row["name"];
          const date = row["Date"] || row["date"];
          const time = row["Time"] || row["time"];
          const status = row["Status"] || row["status"];

          if (!name) return;

          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${name}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td class="${status?.toLowerCase()}">${status}</td>
          `;
          tbody.appendChild(tr);

          validRows++;
          if (status?.toLowerCase() === "present") presentCount++;
          else if (status?.toLowerCase() === "absent") absentCount++;
        });

        document.getElementById("total").textContent = validRows;
        document.getElementById("present").textContent = presentCount;
        document.getElementById("absent").textContent = absentCount;
      })
      .catch(err => console.error("Error loading CSV:", err));
  }

  fetchAttendance();
  setInterval(fetchAttendance, 15000);
});
