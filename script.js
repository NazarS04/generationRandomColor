"use strict";

let boxs = document.querySelectorAll(".main__box");
let buttons = document.querySelectorAll(".main__button");
let main = document.querySelector(".main");
let massage = document.querySelector(".main__massage");

addRandomColorForBox();

document.body.addEventListener("keyup", function (event) {
    if (event.code === "Space") {
        addRandomColorForBox();
    }
});
document.body.addEventListener("keydown", copyAllColors);

main.addEventListener("click", copyColor)
main.addEventListener("selectstart", removeSelect)
main.addEventListener("click", changeCloseOrOpen)


function addRandomColorForBox() {
    for (let i = 0; i < boxs.length; i++) {
        if (buttons[i].dataset.lock === "false") {
            const color = createRandomColor();
            boxs[i].querySelector(".main__title");
            boxs[i].querySelector(".main__title").textContent = color;
            boxs[i].style.backgroundColor = color;
        }
    }
}

function createRandomColor() {
    const source = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += source[Math.floor(Math.random() * source.length)];
    }

    return color;
}

function changeCloseOrOpen(event) {
    let elem = event.target.closest(".main__button");
    if (elem !== null) {
        elem.blur();
        let icon = elem.querySelector(".fa-solid");
        if (elem.dataset.lock === "false") {
            elem.dataset.lock = "true";
            icon.classList.remove("fa-lock-open");
            icon.classList.add("fa-lock");
        } else {
            elem.dataset.lock = "false";
            icon.classList.remove("fa-lock");
            icon.classList.add("fa-lock-open");
        }
    }
}

function copyColor(event) {
    let elem = event.target;
    if (elem.classList.contains("main__title")) {

        // navigator.clipboard.writeText(elem.textContent).then(()=>{
        //     massage.style.top = "40px";
        //     setTimeout(()=>{
        //         massage.style.top = "-60px";
        //     },1500)
        // })

        const elemPos = elem.getBoundingClientRect();
        navigator.clipboard.writeText(elem.textContent).then(() => {
            if (massage.querySelector("h3").textContent === "All color copied") {
                massage.querySelector("h3").textContent = "Color copied";
            }
            massage.style.left = (elemPos.left + (elemPos.width - 200) / 2) + "px";
            massage.style.opacity = "1";
            setTimeout(() => {
                massage.style.opacity = "0";
            }, 1000)
        })
    }
}

function copyAllColors(event) {
    if ((event.ctrlKey || event.metaKey) && event.code === "KeyC") {
        let str = "";
        for (let i = 0; i < boxs.length; i++) {
            str += boxs[i].querySelector(".main__title").textContent + " ";
        }

        navigator.clipboard.writeText(str).then(() => {
            let elem = massage.querySelector("h3");
            elem.textContent = "All color copied";
            massage.style.left = "795.9921875px";
            massage.style.opacity = "1";
            setTimeout(() => {
                massage.style.opacity = "0";
            }, 1000)
        })
    }
}

function removeSelect(event) {
    event.preventDefault();
}