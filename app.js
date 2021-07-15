let defaultFile, presentFile;
let wrongPatter = new Array();
let duplicates = new Array();

let absentee = new Array();
let present = new Array();
let outsideClass = new Array();
let checkBtn = [0, 0, 0, 0, 0];
const btnDetail = document.querySelectorAll(".detail");
let rollCode;

const HTMLFormat = (arr) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str = str + arr[i] + "<br>";
  }
  return str;
};

btnDetail[0].addEventListener("click", () => {
  let c = 0;
  checkBtn[c] = checkBtn[c] == 0 ? 1 : 0;
  if (checkBtn[c] == 1) {
    btnDetail[c].innerText = "Show Less";
    let Div = document.createElement("div");
    Div.classList.add("content-ps");
    Div.innerHTML = HTMLFormat(present);
    btnDetail[c].insertAdjacentElement("beforebegin", Div);
  } else {
    btnDetail[c].innerText = "Show More";
    document.querySelector(`.content-ps`).remove();
  }
});

btnDetail[1].addEventListener("click", () => {
  let c = 1;
  checkBtn[c] = checkBtn[c] == 0 ? 1 : 0;
  if (checkBtn[c] == 1) {
    btnDetail[c].innerText = "Show Less";
    let Div = document.createElement("div");
    Div.classList.add("content-as");
    Div.innerHTML = HTMLFormat(absentee);
    btnDetail[c].insertAdjacentElement("beforebegin", Div);
  } else {
    btnDetail[c].innerText = "Show More";
    document.querySelector(`.content-as`).remove();
  }
});

btnDetail[2].addEventListener("click", () => {
  let c = 2;
  checkBtn[c] = checkBtn[c] == 0 ? 1 : 0;
  if (checkBtn[c] == 1) {
    btnDetail[c].innerText = "Show Less";
    let Div = document.createElement("div");
    Div.classList.add("content-os");
    Div.innerHTML = HTMLFormat(outsideClass);
    btnDetail[c].insertAdjacentElement("beforebegin", Div);
  } else {
    btnDetail[c].innerText = "Show More";
    document.querySelector(`.content-os`).remove();
  }
});

btnDetail[3].addEventListener("click", () => {
  let c = 3;
  checkBtn[c] = checkBtn[c] == 0 ? 1 : 0;
  if (checkBtn[c] == 1) {
    btnDetail[c].innerText = "Show Less";
    let Div = document.createElement("div");
    Div.classList.add("content-ds");
    Div.innerHTML = HTMLFormat(duplicates);
    btnDetail[c].insertAdjacentElement("beforebegin", Div);
  } else {
    btnDetail[c].innerText = "Show More";
    document.querySelector(`.content-ds`).remove();
  }
});

btnDetail[4].addEventListener("click", () => {
  let c = 4;
  checkBtn[c] = checkBtn[c] == 0 ? 1 : 0;
  if (checkBtn[c] == 1) {
    btnDetail[c].innerText = "Show Less";
    let Div = document.createElement("div");
    Div.classList.add("content-is");
    Div.innerHTML = HTMLFormat(wrongPatter);
    btnDetail[c].insertAdjacentElement("beforebegin", Div);
  } else {
    btnDetail[c].innerText = "Show More";
    document.querySelector(`.content-is`).remove();
  }
});

const binarySearch = (l, r, key) => {
  if (l <= r) {
    let mid = l + parseInt((r - l) / 2);
    // console.log(mid);
    if (defaultFile[mid] == key) {
      return mid;
    } else if (defaultFile[mid] < key) {
      return binarySearch(mid + 1, r, key);
    } else {
      return binarySearch(l, mid - 1, key);
    }
  } else {
    return -1;
  }
};

const displayResults = () => {
  const PC = document.querySelectorAll(".basic .title")[0];
  const DC = document.querySelectorAll(".basic .title")[1];
  PC.innerText = presentFile.length;
  DC.innerText = defaultFile.length;
  document.querySelector(".presentStudents .count").innerText = present.length;
  document.querySelector(".absentStudents .count").innerText = absentee.length;
  document.querySelector(".outsideStudents .count").innerText =
    outsideClass.length;
  document.querySelector(".duplicateStudents .count").innerText =
    duplicates.length;
  document.querySelector(".wrongPatternStudents .count").innerText =
    wrongPatter.length;
};

const wrongPatterClean = () => {
  let temp = new Array();
  for (let i = 0; i < wrongPatter.length; i++) {
    let t = parseInt(wrongPatter[i]);
    if (isNaN(t)) {
      temp.push(wrongPatter[i]);
    }
  }
  wrongPatter = temp;
};
const absenteeCheck = (count) => {
  for (let i = 0; i < absentee.length - count; i++) {
    if (binarySearch(0, defaultFile.length - 1, absentee[i]) == -1) {
      outsideClass.push(absentee[i]);
      absentee.splice(i, 1);
    }
  }
  wrongPatterClean();
  displayResults();
};

const finalCheck = () => {
  defaultFile = defaultFile.split("\r\n");
  for (let i = 0; i < defaultFile.length; i++) {
    defaultFile[i] = parseInt(defaultFile[i]);
  }
  defaultFile.sort();
  let k = 0;
  let i;
  for (i = 0; i < presentFile.length; ) {
    if (
      presentFile[i] >= defaultFile[0] &&
      presentFile[i] <= defaultFile[defaultFile.length - 1]
    ) {
      if (presentFile[i] == defaultFile[k]) {
        present.push(defaultFile[k]);
        k++;
      } else if (presentFile[i] < defaultFile[k]) {
        absentee.push(presentFile[i]);
      } else {
        while (presentFile[i] > defaultFile[k]) {
          absentee.push(defaultFile[k]);
          k++;
        }
        if (presentFile[i] == defaultFile[k]) {
          present.push(presentFile[i]);
          k++;
        } else {
          absentee.push(presentFile[i]);
        }
      }
    } else {
      outsideClass.push(presentFile[i]);
    }
    i++;
  }
  let count = 0;
  if (k < defaultFile.length) {
    while (k < defaultFile.length) {
      absentee.push(defaultFile[k]);
      k++;
      count++;
    }
  }
  // console.log(absentee);
  absenteeCheck(count);
};

const duplicateDetector = () => {
  presentFile.sort();
  for (let i = 0; i < presentFile.length - 1; i++) {
    if (presentFile[i] == presentFile[i + 1]) {
      duplicates.push(presentFile[i]);
      presentFile.splice(i, 1);
    }
  }
  finalCheck();
};

const refining = () => {
  let file = new Array();
  for (let i = 0; i < presentFile.length; i++) {
    let temp = presentFile[i].split(" ");
    if (temp[0].length > 7) {
      if (temp[0].length == 8 && temp[0][7] == ":") {
        temp[0] = temp[0].split(":")[0];
        file.push(temp[0]);
      } else {
        wrongPatter.push(temp[0]);
      }
    } else {
      file.push(temp[0]);
    }
  }
  presentFile = new Array();
  for (let i = 0; i < file.length; i++) {
    if (isNaN(file[i])) {
      wrongPatter.push(file[i]);
    } else {
      presentFile.push(parseInt(file[i]));
    }
  }
  duplicateDetector();
};

const cleaning = () => {
  try {
    let file = presentFile.split("\t");
    let temp = new Array();
    for (let i = 1; i < file.length; i = i + 2) {
      temp.push(file[i]);
    }
    presentFile = temp;
  } catch (e) {
    alert("Please Refresh the PAGE!");
    return;
  }
  refining();
};

const form = document.querySelector("form");
const defaultFileInput = document.getElementById("defaultFile");
const presentFileInput = document.getElementById("presentFile");
const classType = document.getElementsByName("classType");

defaultFileInput.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    defaultFile = fr.result;
  };
  fr.readAsText(this.files[0]);
});
presentFileInput.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    presentFile = fr.result;
  };
  fr.readAsText(this.files[0]);
});

const cleaningGoogle = () => {
  try {
    presentFile = presentFile.split("\r\n");
    let arr = new Array();
    let temp;
    for (let i = 0; i < presentFile.length; i++) {
      if (presentFile[i].indexOf("_") == 3) {
        temp = presentFile[i].split("_");
      } else if (presentFile[i].indexOf(" ") == 3) {
        temp = presentFile[i].split(" ");
      } else {
        wrongPatter.push(presentFile[i]);
        continue;
      }
      arr.push(temp[0]);
    }
    presentFile = arr;
    for (let i = 0; i < presentFile.length; i++) {
      let t = rollCode + presentFile[i];
      presentFile[i] = parseInt(t);
    }
  } catch (e) {
    alert("Please Refresh the PAGE!");
    return;
  }
  duplicateDetector();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (classType[0].checked) {
    console.log("zoom");
    cleaning();
  } else if (classType[1].checked) {
    console.log("google");
    rollCode = document.querySelector(".rollcode").value;
    cleaningGoogle();
  } else {
    console.log("Others IN PROGRESS");
  }
  document.getElementById("results").scrollIntoView({ block: "center" });
  btnDetail.forEach((btn) => {
    btn.disabled = false;
  });
});
