/* ==========================================
   PDF UPLOAD SYSTEM
========================================== */
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js";
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
let loadedPdf = null;
if(
    window.pdfjsLib
){

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

}
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
    async (event)=>{
    
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
       await loadPdfPreview(
    file
);

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
    async (event)=>{

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
       await loadPdfPreview(
    file
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

const watermarkPreview =
    document.getElementById(
        "watermark-preview"
    );


function updatePreview(){

    watermarkPreview.textContent =
        watermarkSettings.text ||
        "WATERMARK";

    watermarkPreview.style.fontSize =
        watermarkSettings.fontSize
        + "px";

    watermarkPreview.style.opacity =
        watermarkSettings.opacity
        / 100;

    watermarkPreview.style.transform =
        `rotate(
            ${watermarkSettings.rotation}deg
        )`;

}


watermarkText.addEventListener(
    "input",
    updatePreview
);

fontSize.addEventListener(
    "input",
    updatePreview
);

opacity.addEventListener(
    "input",
    updatePreview
);

rotation.addEventListener(
    "input",
    updatePreview
);

updatePreview();
async function loadPdfPreview(
    file
){

    try{

        const arrayBuffer =
            await file.arrayBuffer();

        loadedPdf =
            await pdfjsLib
                .getDocument({
                    data:
                        arrayBuffer
                })
                .promise;

        console.log(
            "PDF Loaded Successfully"
        );

    }

    catch(error){

        console.error(
            error
        );

        alert(
            "PDF Loading Failed"
        );

    }

}


async function renderFirstPage(){

    if(
        !loadedPdf
    ){
        return;
    }

    const page =
        await loadedPdf.getPage(
            1
        );

    const canvas =
        document.getElementById(
            "pdf-preview-canvas"
        );

    const context =
        canvas.getContext(
            "2d"
        );

    const viewport =
        page.getViewport(
            {
                scale:
                    1.2
            }
        );

    canvas.width =
        viewport.width;

    canvas.height =
        viewport.height;
canvas.style.display =
    "block";
    await page.render(
        {
            canvasContext:
                context,

            viewport:
                viewport
        }
    ).promise;

   }

/* ==========================================
   NAVIGATION TO PREVIEW
========================================== */

const continuePreviewBtn =
    document.getElementById(
        "continue-preview-btn"
    );

continuePreviewBtn.addEventListener(
    "click",
    ()=>{

        document
            .getElementById(
                "watermark-section"
            )
            .classList.add(
                "hidden"
            );

        document
            .getElementById(
                "preview-section"
            )
            .classList.remove(
                "hidden"
            );

        updatePreview();

        renderFirstPage();

    }
);

