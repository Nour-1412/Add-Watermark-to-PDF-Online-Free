/* ==========================================
   PDF UPLOAD SYSTEM
========================================== */

const pdfInput =
    document.getElementById(
        "pdf-input"
    );

const chooseFileBtn =
    document.getElementById(
        "choose-file-btn"
    );

const dropZone =
    document.getElementById(
        "drop-zone"
    );

let uploadedFile = null;
const watermarkSettings = {

    text:
        "",

    fontSize:
        32,

    opacity:
        50,

    rotation:
        -45

};

/* ==========================================
   BUTTON CLICK
========================================== */

chooseFileBtn.addEventListener(
    "click",
    () => {

        pdfInput.click();

    }
);


/* ==========================================
   FILE SELECT
========================================== */

pdfInput.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];

        if(
            !file
        ){
            return;
        }

        if(
            file.type !==
            "application/pdf"
        ){

            alert(
                "Please choose a PDF file."
            );

            return;
        }

        uploadedFile =
            file;

        console.log(
            "PDF Loaded:",
            file.name
        );

        alert(
            `Loaded: ${file.name}`
        );
       document
    .getElementById(
        "upload-section"
    )
    .classList.add(
        "hidden"
    );

document
    .getElementById(
        "watermark-section"
    )
    .classList.remove(
        "hidden"
    );

    }
);


/* ==========================================
   DRAG AND DROP
========================================== */

dropZone.addEventListener(
    "dragover",
    (event) => {

        event.preventDefault();

    }
);

dropZone.addEventListener(
    "drop",
    (event) => {

        event.preventDefault();

        const file =
            event.dataTransfer
            .files[0];

        if(
            !file
        ){
            return;
        }

        if(
            file.type !==
            "application/pdf"
        ){

            alert(
                "Please choose a PDF file."
            );

            return;
        }

        uploadedFile =
            file;

        alert(
            `Loaded: ${file.name}`
        );
       
document
    .getElementById(
        "upload-section"
    )
    .classList.add(
        "hidden"
    );

document
    .getElementById(
        "watermark-section"
    )
    .classList.remove(
        "hidden"
    );
    }
);
/* ==========================================
   WATERMARK SETTINGS EVENTS
========================================== */

const watermarkText =
    document.getElementById(
        "watermark-text"
    );

const fontSize =
    document.getElementById(
        "font-size"
    );

const opacity =
    document.getElementById(
        "opacity"
    );

const rotation =
    document.getElementById(
        "rotation"
    );


watermarkText.addEventListener(
    "input",
    (event)=>{

        watermarkSettings.text =
            event.target.value;

        console.log(
            watermarkSettings
        );

    }
);


fontSize.addEventListener(
    "input",
    (event)=>{

        watermarkSettings.fontSize =
            event.target.value;

        console.log(
            watermarkSettings
        );

    }
);


opacity.addEventListener(
    "input",
    (event)=>{

        watermarkSettings.opacity =
            event.target.value;

        console.log(
            watermarkSettings
        );

    }
);


rotation.addEventListener(
    "input",
    (event)=>{

        watermarkSettings.rotation =
            event.target.value;

        console.log(
            watermarkSettings
        );

    }
);

