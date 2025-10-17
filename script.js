document.addEventListener("DOMContentLoaded", function () {
  const sheetUrl = "https://opensheet.elk.sh/1aAS9-IxiqwQ3p6Epszo6mX-CNNM0biN1KfZmLiChOAE/Sheet1"; // <-- replace with your ID + sheet name

  fetch(sheetUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Fetched data:", data); // ✅ Check in console
      const tbody = document.getElementById("attendance-table");
      tbody.innerHTML = "";

      let presentCount = 0;
      let absentCount = 0;

      data.forEach(row => {
        if (!row.Name) return; // skip empty rows

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
