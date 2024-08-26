import * as THREE from "three";
import { initScene, animate } from "./scene.js";
import { loadModel, changeModelColor } from "./modelLoader.js";
import { annotationInteraction, createAnnotation } from "./annotation.js";
import { animateCamera, reverseCameraAnimation } from "./cameraAnimation.js";
import { Annotation } from "./annotationCreator.js";

//globals
const MODEL_PATH = "/models/ovini_chair_optimized.glb";
let CAMERA;
let annotationFabric, annotationLegs, closelegs, closeFabric;

function init() {
  const canvas = document.getElementById("canvas");
  const { scene, camera, renderer } = initScene(canvas);
  CAMERA = camera;

  const loadingOverlay = document.getElementById("loading-overlay");
  loadingOverlay.style.display = "flex";

  //Adding model to scene
  loadModel(scene, MODEL_PATH).then(() => {
    // Hide the loading overlay after the model is loaded
    loadingOverlay.style.display = "none";
  });

  if (window.matchMedia("(max-width: 768px)").matches) {
    annotationFabric = new Annotation(
      scene,
      new THREE.Vector3(0, 0.7, 0.1),
      "/textures/fabric.png",
      0.2,
      0.1
    );
    annotationLegs = new Annotation(
      scene,
      new THREE.Vector3(0, -0.08, -0.1),
      "/textures/legs.png",
      0.2,
      0.1
    );
  } else {
    annotationFabric = new Annotation(
      scene,
      new THREE.Vector3(0, 0.55, 0.4),
      "/textures/fabric.png",
      0.2,
      0.1
    );
    annotationLegs = new Annotation(
      scene,
      new THREE.Vector3(0, 0.15, -0.3),
      "/textures/legs.png",
      0.2,
      0.1
    );
  }
  annotationFabric.setVisibility(false); // Initially hidden
  annotationLegs.setVisibility(false);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("resize", resize);
  animate(scene, camera, renderer);

  //Updates the size of the renderer and the aspect ratio of the camera when the window resizes.
  resize();
}
init();

/**model anotations:
 * fabric_mat,
 * metal_mat,
 * laces_mat,
 * wood_mat
 */

document.querySelector(".animations-btn").addEventListener("click", () => {
  activateModifierBasedOnWidth();
  annotationFabric.setVisibility(true);
  annotationFabric.setInteraction(CAMERA, () => {
    animateFabric();
    //after click on annotation hide the annotation
    annotationFabric.setVisibility(false);
    annotationLegs.setVisibility(false);

    $(".close-animation").css("display", "flex");
    $(".close-animation img").attr("src", "/textures/close.png");
  });

  annotationLegs.setVisibility(true);
  annotationLegs.setInteraction(CAMERA, () => {
    animatelegs();
    annotationFabric.setVisibility(false);
    annotationLegs.setVisibility(false);
    $(".close-animation").css("display", "flex");
    $(".close-animation img").attr("src", "/textures/close.png");
  });
});

$(".close-animation").click(function () {
  activateModifierBasedOnWidth();
  annotationFabric.setVisibility(true);
  annotationLegs.setVisibility(true);
  $(this).css("display", "none");
});

document.querySelector(".configurator-btn").addEventListener("click", () => {
  $(".close-animation").css("display", "none");
  //set camera on start position
  animateCamera(CAMERA, new THREE.Vector3(2, 0.35, 0));

  annotationFabric.setVisibility(false);
  annotationLegs.setVisibility(false);
});

$(document).ready(function () {
  $(window).resize(function () {
    activateModifierBasedOnWidth();
    applyMarginBasedOnChange();
    applyMarginBasedOnChangeMobile();
  });
});

let selectedBodyColor = "#d4c8a3";
let previousBodyColor = "";
let selectedCornerColor = "#d4c8a3";
let selectedHandleColor = "#d4c8a3";
let selectedlegsColor = "#d4c8a3";

function applyMarginBasedOnChangeMobile() {
  const isMobile = window.matchMedia("(max-width: 880px)").matches;
  const isActiveAnimation = $(".animations-btn.active").length > 0;
  const isActiveConfigurator = $(".configurator-btn.active").length > 0;
  const isCheckedRadio =
    $('.lower-btns input[type="radio"]:checked').length > 0;

  if (isMobile) {
    if (isCheckedRadio) {
      $("#canvas").css("margin-top", "-145px");
      $(".lower-btns").css({ display: "none" });
    } else {
      $(".lower-btns").css("display", "flex");
      $("#canvas").css("height", "100vh");
    }
  } else {
    $("#canvas").css({ "margin-top": "0" });
    $(".lower-btns").css("display", "flex");
  }
  if (!isCheckedRadio) {
    $("#canvas").css("margin-right", "0");
  }
  if (isActiveAnimation) {
    $(".lower-btns").css("display", "none");
    $("#color-picker").css("display", "none");
    $(".upper-btns").css("display", "flex");
    $("#canvas").css({
      "margin-right": "0",
      width: "100%",
      height: "100vh",
    });
    $("#canvas").css({ "margin-top": "0" });

    $('.lower-btns input[type="radio"]:checked').prop("checked", false);
  }
}

function animateFabric() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    animateCamera(CAMERA, new THREE.Vector3(0.9, 1.5, 0.5));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(0.6, 1.5, 0.4));
  }
}
function animatelegs() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    animateCamera(CAMERA, new THREE.Vector3(1.2, -0.8, 0.9));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(1, -0.2,0.3));
  }
}

function applyMarginBasedOnChange() {
  const colorPicker = $("#color-picker");
  const colorOptions = $(".color-options");
  const container3d = $("#canvas");

  if (window.matchMedia("(max-width: 1000px)").matches) {
    container3d.css("margin-right", "25%");
    colorPicker.css({ right: "10px", width: "260px" });
    colorOptions.css("column-gap", "15px");
  } else if (window.matchMedia("(max-width: 1210px)").matches) {
    colorOptions.css("column-gap", "15px");
  } else {
    container3d.css("margin-right", "0");
    container3d.css("margin-right", "0");
    colorPicker.css("right", "35px");
  }
}

// event that define any chage on suitcase parts
$('.lower-btns input[type="radio"]').on("change", function () {
  const isMobile = window.matchMedia("(max-width: 880px)").matches;
  const selectedValue = event.target.value;

  handleRadioChange(selectedValue);
  if (isMobile) {
    $("#color-picker").css("display", "flex");
  } else {
    $("#color-picker").css("display", "flex").hide().fadeIn("fast");
  }
  applyMarginBasedOnChange();
  applyMarginBasedOnChangeMobile();
});
// logic for each suitcase part
function handleRadioChange(selectedValue) {
  switch (selectedValue) {
    case "body":
      bodyClicked();

      break;
    case "laces":
      lacesClicked();

      break;
    case "fabric":
      fabricClicked();

      break;
    case "legs":
      legsClicked();

      break;
    default:
      break;
  }
}

// next and previous btn order
const inputs = ["#body", "#laces", "#fabric", "#legs"];
let currentIndex = 0;

function setCurrentIndex(index) {
  currentIndex = index;
}

$(".next-btn").on("click", function () {
  currentIndex = (currentIndex + 1) % inputs.length;
  $(inputs[currentIndex]).click();
});
$(".prev-btn").on("click", function () {
  currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;
  $(inputs[currentIndex]).click();
});

inputs.forEach((input, index) => {
  $(input).on("click", function () {
    setCurrentIndex(index);
  });
});

const buttons = $(".configurator-btn, .animations-btn");

buttons.on("click", function () {
  $(".configurator-btn, .animations-btn").removeClass("active");
  $(this).addClass("active");
});

$(document).on("click", ".animations-btn.active", function () {
  applyMarginBasedOnChangeMobile();
});

$(document).on("click", ".configurator-btn.active", function () {
  applyMarginBasedOnChangeMobile();
});

function closeColorPicker() {
  $("#color-picker").css("display", "none");
  $("#canvas").css({ "margin-right": "0", "margin-top": "0" });
  $('.lower-btns input[type="radio"]:checked').prop("checked", false);
  $(".upper-btns").css("display", "flex");
  $(".lower-btns").css("display", "flex");
  $("#canvas").css("height", "100vh");
  activateModifierBasedOnWidth();
}

$(".close-popup").click(function () {
  closeColorPicker();
});

const colorCombinations = {
  "#0000FF": ["#0000FF", "#444444", "#d4c8a3"],
  "#6AA84F": ["#6AA84F", "#444444", "#d4c8a3"],
  "#E69138": ["#E69138", "#444444", "#d4c8a3"],
  "#FF0000": ["#FF0000", "#444444", "#d4c8a3"],
  "#444444": ["#444444", "#d4c8a3"],
  "#d4c8a3": ["#444444", "#d4c8a3"],
};

// on body color selection depends other available color option for other parts. default for body is CHROME SATIN ALUMINUM. if user chose other body color then other parts reset to default color
function updateColorOptions(selectedColor) {
  const availableColors = colorCombinations[selectedColor];

  if (availableColors === undefined) return;

  $(".color-option").each(function () {
    const $option = $(this);
    if (availableColors.includes($option.data("color"))) {
      $option.show().removeClass("selected");
    } else {
      $option.hide();
    }
  });
}

function clearColorOptionEventListeners() {
  $(".color-option").each(function () {
    const $option = $(this);
    const $newOption = $option.clone(true);
    $option.replaceWith($newOption);
  });
}

function activateModifierBasedOnWidth() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    animateCamera(CAMERA, new THREE.Vector3(2.6, 0.35, 0));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(2, 0.35, 0));
  }
}
function activateAnimationBodyPart() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    animateCamera(CAMERA, new THREE.Vector3(2.4, 0.35, 0));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(1.8, 0.35, 0));
  }
}
function activateAnimationFabricPart() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    animateCamera(CAMERA, new THREE.Vector3(2, 1.4, 0));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(1, 1.4, 0));
  }
}
function activateAnimationLacesPart() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    animateCamera(CAMERA, new THREE.Vector3(0.7, 1, -0.9));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(0.4, 0.9, 0.5));
  }
}
function activateAnimationLegsPart() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    animateCamera(CAMERA, new THREE.Vector3(1.9, -0.3, 0.2));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(1.2, -0.3, 0.2));
  }
}
function bodyClicked() {
  $(".title-x .title").text("BODY COLOR");
  activateAnimationBodyPart();

  $(".upper-btns").css("display", "none");
  clearColorOptionEventListeners();
  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach((option) => {
    document.querySelector(".color-chosen").textContent = $(
      ".color-option.selected"
    ).data("name");
    option.style.display = "flex";
    if (selectedBodyColor !== "") {
      if (option.dataset.color === selectedBodyColor) {
        option.classList.add("selected");

        changeModelColor("metal_mat", selectedBodyColor);
        changeModelColor("fabric_mat", selectedBodyColor);
        changeModelColor("laces_mat", selectedBodyColor);
        changeModelColor("wood_mat", selectedBodyColor);
      } else {
        option.classList.remove("selected");
      }
    } else {
      changeModelColor("metal_mat", "#d4c8a3");
    }

    option.addEventListener("click", function () {
      colorOptions.forEach((opt) => opt.classList.remove("selected"));
      const element = this;

      element.classList.add("selected");
      const newSelectedColor = element.dataset.color;

      if (newSelectedColor !== selectedBodyColor) {
        console.log("sdsdsds");

        // Body color has changed
        selectedBodyColor = newSelectedColor; // Update the new selected color
        document.querySelector(".color-chosen").textContent =
          element.dataset.name;
        changeModelColor("metal_mat", selectedBodyColor);
        changeModelColor("fabric_mat", "#d4c8a3");
        changeModelColor("laces_mat", "#d4c8a3");
        changeModelColor("wood_mat", "#d4c8a3");

        selectedCornerColor = "#d4c8a3";
        selectedHandleColor = "#d4c8a3";
        selectedlegsColor = "#d4c8a3";
      }
    });
  });
}

function setupColorOptions(partType, selectedColor, defaultColor, partObjects) {
  const colorOptions = document.querySelectorAll(".color-option");
  document.querySelector(".color-chosen").textContent = $(
    ".color-option.selected"
  ).data("name");
  colorOptions.forEach((option) => {
    option.classList.remove("selected");
    if (selectedColor !== "") {
      if (option.dataset.color === selectedColor) {
        option.classList.add("selected");
        document.querySelector(".color-chosen").textContent =
          option.dataset.name;
      }
    } else {
      colorOptions[0].classList.add("selected");
      document.querySelector(".color-chosen").textContent = $(
        ".color-option.selected"
      ).data("name");
    }

    if (previousBodyColor !== "" && selectedBodyColor !== previousBodyColor) {
      option.classList.remove("selected");
      colorOptions[0].classList.add("selected");
      changeModelColor(partObjects, defaultColor);
    } else {
      changeModelColor(partObjects, selectedColor);
    }

    option.addEventListener("click", function () {
      colorOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      const newColor = this.dataset.color;

      // Set the correct global variable based on the part type
      switch (partType) {
        case "fabric":
          selectedCornerColor = newColor;
          break;
        case "laces":
          selectedHandleColor = newColor;
          break;
        case "legs":
          selectedlegsColor = newColor;
          break;
        default:
          break;
      }

      document.querySelector(".color-chosen").textContent = this.dataset.name;
      changeModelColor(partObjects, newColor);
    });
  });
}

function fabricClicked() {
  $(".title-x .title").text("fabric");
  activateAnimationFabricPart();
  console.log(CAMERA);

  clearColorOptionEventListeners();
  updateColorOptions(selectedBodyColor);
  setupColorOptions("fabric", selectedCornerColor, "#d4c8a3", "fabric_mat");
}

function lacesClicked() {
  $(".title-x .title").text("laces");
  activateAnimationLacesPart();
  clearColorOptionEventListeners();
  updateColorOptions(selectedBodyColor);
  setupColorOptions("laces", selectedHandleColor, "#d4c8a3", "laces_mat");
}

function legsClicked() {
  $(".title-x .title").text("legs");
  activateAnimationLegsPart();
  clearColorOptionEventListeners();
  updateColorOptions(selectedBodyColor);
  setupColorOptions("legs", selectedlegsColor, "#d4c8a3", "wood_mat");
}

function handleImageDisplay(inputSelector, shouldDisplay) {
  $(inputSelector).click(function () {
    $(".no-image, .no-image-text").css(
      "display",
      shouldDisplay ? "flex" : "none"
    );
  });
}

handleImageDisplay("input#laces, input#fabric, input#legs", false);
handleImageDisplay("input#body", true);

$(".left-btn").on("click", function () {
  $(".color-options").animate({ scrollLeft: "-=100px" }, "smooth");
});

$(".right-btn").on("click", function () {
  $(".color-options").animate({ scrollLeft: "+=100px" }, "smooth");
});
