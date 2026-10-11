/* =========================
   PASSWORD
========================= */

const PASSWORD = "160826";

let input = "";


const lockScreen =
    document.getElementById("lockScreen");

const mainSite =
    document.getElementById("mainSite");

const dots =
    document.querySelectorAll(".dots span");

const wrong =
    document.getElementById("wrong");


/* Update titik password */

function updateDots() {

    dots.forEach((dot, index) => {

        if (index < input.length) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    });

}


/* Cek password */

function checkPassword() {

    if (input === PASSWORD) {

        lockScreen.style.transition =
            "opacity .8s, transform .8s";

        lockScreen.style.opacity = "0";

        lockScreen.style.transform =
            "scale(1.03)";


        setTimeout(() => {

            lockScreen.classList.add("hidden");

            mainSite.classList.remove("hidden");

            window.scrollTo(0, 0);

        }, 800);


    } else {

        wrong.classList.add("show");

        input = "";

        updateDots();


        setTimeout(() => {

            wrong.classList.remove("show");

        }, 1000);

    }

}


/* =========================
   KEYPAD
========================= */

document
.querySelectorAll(".keypad button")
.forEach(button => {

    button.addEventListener("click", () => {

        const key =
            button.dataset.key;


        /* Clear */

        if (key === "clear") {

            input = "";

        }


        /* Backspace */

        else if (key === "back") {

            input =
                input.slice(0, -1);

        }


        /* Angka */

        else {

            if (input.length < 6) {

                input += key;

            }

        }


        updateDots();


        if (input.length === 6) {

            setTimeout(
                checkPassword,
                150
            );

        }

    });

});


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            lockScreen.classList.contains(
                "hidden"
            )
        ) return;


        if (
            /^[0-9]$/.test(event.key)
        ) {

            if (input.length < 6) {

                input += event.key;

            }

        }


        if (
            event.key === "Backspace"
        ) {

            input =
                input.slice(0, -1);

        }


        if (
            event.key === "Escape"
        ) {

            input = "";

        }


        updateDots();


        if (input.length === 6) {

            setTimeout(
                checkPassword,
                150
            );

        }

    }
);


/* =========================
   START AGAIN
========================= */

document
.getElementById("replayBtn")
.addEventListener("click", () => {

    mainSite.classList.add("hidden");

    lockScreen.classList.remove(
        "hidden"
    );

    lockScreen.style.opacity = "1";

    lockScreen.style.transform =
        "none";

    input = "";

    updateDots();

    window.scrollTo(0, 0);

});


/* =========================
   MUSIC
========================= */

const musicBtn =
    document.getElementById(
        "musicBtn"
    );


const music =
    new Audio(
        "assets/music.mp3"
    );


music.loop = true;

let musicPlaying = false;


musicBtn.addEventListener(
    "click",
    async () => {

        try {

            if (!musicPlaying) {

                await music.play();

                musicPlaying = true;

                musicBtn.textContent =
                    "❚❚";

            }

            else {

                music.pause();

                musicPlaying = false;

                musicBtn.textContent =
                    "♫";

            }

        }

        catch {

            alert(
                "Masukkan file musik ke assets/music.mp3"
            );

        }

    }
);