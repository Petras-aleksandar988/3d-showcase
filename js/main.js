import * as THREE from 'three';
import { initScene, animate } from './scene.js';
import { loadModel, changeModelColor } from './modelLoader.js';
import { annotationInteraction, createAnnotation } from './annotation.js';
import { animateCamera, reverseCameraAnimation } from './cameraAnimation.js';
import {Annotation} from './annotationCreator.js';

//globals
const MODEL_PATH = '/models/ovini_chair_optimized.glb';
let CAMERA;
let annotationFabric, annotationLegs,closelegs, closeFabric;


function init() {
    const canvas = document.getElementById('canvas');
    const {scene, camera, renderer} = initScene(canvas);
    CAMERA = camera;

    

    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'flex';

    //Adding model to scene
    loadModel(scene, MODEL_PATH).then(() => {
      // Hide the loading overlay after the model is loaded
      loadingOverlay.style.display = 'none';
  });

    annotationFabric = new Annotation(scene, new THREE.Vector3(0, 0.55, 0.30), '/textures/fabric.png', 0.2, 0.1);
    annotationFabric.setVisibility(false); // Initially hidden

    closeFabric = new Annotation(scene, new THREE.Vector3(0, 0.55, 0.3), '/textures/close.png',  0.05, 0.05);
    closeFabric.setVisibility(false); 

    annotationLegs = new Annotation(scene, new THREE.Vector3(0, 0.15, -0.3), '/textures/legs.png', 0.2, 0.1);
    annotationLegs.setVisibility(false);

    closelegs = new Annotation(scene, new THREE.Vector3(0.4, 0.15, -0.2), '/textures/close.png', 0.05, 0.05);
    closelegs.setVisibility(false);

    function resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', resize);
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



document.querySelector('.animations-btn').addEventListener('click', () => {
  annotationFabric.setVisibility(true);
  annotationFabric.setInteraction(CAMERA, () => {
    animateCamera(CAMERA, new THREE.Vector3(0.4, 1.2, 0));
    //after click on annotation hide the annotation
    annotationFabric.setVisibility(false);
    annotationLegs.setVisibility(false);
    closelegs.setVisibility(false);
    closeFabric.setVisibility(true);
  });

  annotationLegs.setVisibility(true);
  annotationLegs.setInteraction(CAMERA, ()=>{
    animateCamera(CAMERA, new THREE.Vector3(1, -0.2, 0));
    annotationFabric.setVisibility(false);
    annotationLegs.setVisibility(false);
    closeFabric.setVisibility(false);
    closelegs.setVisibility(true);
  });
   
});
closelegs.setInteraction(CAMERA, ()=>{
  activateModifierBasedOnWidth()
  annotationFabric.setVisibility(true);
  annotationLegs.setVisibility(true);
  closelegs.setVisibility(false);
  closeFabric.setVisibility(false);
});
closeFabric.setInteraction(CAMERA, ()=>{
  activateModifierBasedOnWidth()
  annotationFabric.setVisibility(true);
  annotationLegs.setVisibility(true);
  closelegs.setVisibility(false);
  closeFabric.setVisibility(false);
});

document.querySelector('.configurator-btn').addEventListener('click', () => {
  //set camera on start position
  animateCamera(CAMERA, new THREE.Vector3(2,0.35, 0));

  annotationFabric.setVisibility(false);
  annotationLegs.setVisibility(false);
  closelegs.setVisibility(false);
  closeFabric.setVisibility(false);
});




  $(document).ready(function () {
    // Call Camera function on page load
    // activateCameraBasedOnWidth();
    $(window).resize(function () {
      activateModifierBasedOnWidth()
      applyMarginBasedOnChange()
      applyMarginBasedOnChangeMobile();
    });
  });
  
  let selectedBodyColor =  "#DFDFE1"
  let previousBodyColor = "";
  let selectedCornerColor = "";
  let selectedHandleColor = "";
  let selectedlegsColor = "";
  
   
  function applyMarginBasedOnChangeMobile() {
    const isMobile = window.matchMedia("(max-width: 880px)").matches;
    const isActiveAnimation = $(".animations-btn.active").length > 0;
    const isActiveConfigurator = $(".configurator-btn.active").length > 0;
    const isCheckedRadio = $('.lower-btns input[type="radio"]:checked').length > 0;
  
    if (isMobile) {
      if (isCheckedRadio) {
          $("#canvas").css("margin-top", "-145px");
          $(".lower-btns").css({ "display": "none" });
  
      } else {
          $(".lower-btns").css("display", "flex");
        $("#canvas").css("height", "100vh");
      }
    } else {
      $("#canvas").css({ "margin-top": "0"});
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
      $("#canvas").css({ "margin-top": "0"});
  
      $('.lower-btns input[type="radio"]:checked').prop("checked", false);
    //   Unlimited3D.showAnnotations({
    //     annotationObjects: [
    //       {
    //         annotations: ["Open", "Wheel spinner on", "Extend handle"],
    //       },
    //     ],
    //   });
    }
    if (isActiveConfigurator) {
//       Unlimited3D.hideAnnotations({
//         annotations: ["Open","Close","Wheel spinner on","Wheel spinner off", "Extend handle","Retract handle"
//   ],
//       });
  
  
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
    //   colorPicker.css({ right: "-85px", width: "270px" });
      colorOptions.css("column-gap", "15px");
    //   container3d.css("margin-right", "20%");
  
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
    if(isMobile) {
      $('#color-picker').css('display', 'flex')
    }else{
   $('#color-picker').css('display', 'flex').hide().fadeIn('fast');
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
  const inputs = ["#body","#laces", "#fabric", "#legs", ];
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
  
  
  buttons.on("click", function() {
      $(".configurator-btn, .animations-btn").removeClass("active");
      $(this).addClass("active");
  });
  
  
  $(document).on("click", ".animations-btn.active", function () {
    // activateCameraBasedOnWidth();
    applyMarginBasedOnChangeMobile();
  
  });
  
  $(document).on("click", ".configurator-btn.active", function () {
    console.log('click is active');
    
    applyMarginBasedOnChangeMobile();
   
  });
  
  
   // animations
  function openSuitcase() {
    Unlimited3D.activateModifier({ modifier: "open" });
    if (window.matchMedia("(max-width: 880px)").matches) {
      $("#canvas").css({ height: "60vh", "margin-top": "130px" });
    } else {
      $("#canvas").css({ height: "100%", "margin-top": "0" });
    }
  
    Unlimited3D.hideAnnotations(
      {
        annotations: ["Open", "Extend handle", "Wheel spinner off", "Wheel spinner on", ],
      },
      function () {
        Unlimited3D.showAnnotations({
          annotationObjects: [
            {
              annotations: ["Close"],
            },
          ],
        });
      }
    );
  }
  
  
  function closeSuitcase() {
  $("#canvas").css({"height": "100vh", "margin-top": "0px" });
  Unlimited3D.activateModifier({ modifier: "close" });
  Unlimited3D.hideAnnotations(
      {
          annotations: ["Close"],
      },
      function () {
          Unlimited3D.showAnnotations({
              annotationObjects: [
                  {
                      annotations: ["Open", "Extend handle", "Wheel spinner on"],
                  },
              ],
          });
      }
  );
  
  }
  function legspinnerOn() {
      Unlimited3D.activateModifier({ modifier: "wheel_spinner_on" });
    Unlimited3D.hideAnnotations(
      {
        annotations: ["Open", "Extend handle", "Wheel spinner on"],
      },
      function () {
        Unlimited3D.showAnnotations({
          annotationObjects: [
            {
              annotations: ["Wheel spinner off"],
            },
          ],
        });
      }
    );
  }
  
  function legspinnerOff() {
    Unlimited3D.activateModifier({ modifier: "wheel_spinner_off" });
    Unlimited3D.hideAnnotations(
      {
        annotations: ["Close"],
      },
      function () {
        Unlimited3D.showAnnotations({
          annotationObjects: [
            {
              annotations: ["Open", "Extend handle", "Wheel spinner on"],
            },
          ],
        });
      }
    );
  }
  
  function extendHandle() {
    Unlimited3D.activateModifier({ modifier: "extend_handle" });
  
    $(".upper-btns").css("display", "none");
    Unlimited3D.hideAnnotations(
      {
        annotations: [
          "Open",
          "Extend handle",
          "Wheel spinner off",
          "Wheel spinner on",
        ],
      },
      function () {
        Unlimited3D.showAnnotations({
          annotationObjects: [
            {
              annotations: ["Retract handle"],
            },
          ],
        });
      }
    );
  }
  function retractHandle() {
    Unlimited3D.activateModifier({ modifier: "retract_handle" });
    $(".upper-btns").css("display", "flex");
    Unlimited3D.hideAnnotations(
      {
        annotations: ["Retract handle"],
      },
      function () {
        Unlimited3D.showAnnotations({
          annotationObjects: [
            {
              annotations: ["Open", "Extend handle", "Wheel spinner on"],
            },
          ],
        });
      }
    );
  }
  
  function closeColorPicker() {
      $('#color-picker').css("display", "none");
      $("#canvas").css({"margin-right":"0" , "margin-top":"0" });
      $('.lower-btns input[type="radio"]:checked').prop("checked", false);
      $(".upper-btns").css("display", "flex");
      $(".lower-btns").css("display", "flex");
      $("#canvas").css("height", "100vh");
      activateModifierBasedOnWidth()
  }
  
  $(".close-popup").click(function () {
    closeColorPicker();
  });
  
  const colorCombinations = {
      '#0000FF': ['#0000FF', '#444444', '#DFDFE1'],
      '#6AA84F': ['#6AA84F', '#444444', '#DFDFE1'],
      '#E69138': ['#E69138', '#444444', '#DFDFE1'],
      '#FF0000': ['#FF0000', '#444444', '#DFDFE1'],
      '#444444': ['#444444', '#DFDFE1'],
      '#DFDFE1': ['#444444', '#DFDFE1']
  };
  
   // on body color selection depends other available color option for other parts. default for body is CHROME SATIN ALUMINUM. if user chose other body color then other parts reset to default color
  function updateColorOptions(selectedColor) {
      const availableColors = colorCombinations[selectedColor];
  
      if (availableColors === undefined) return;
  
      $('.color-option').each(function() {
          const $option = $(this);
          if (availableColors.includes($option.data('color'))) {
              $option.show().removeClass('selected');
          } else {
              $option.hide();
          }
      });
  }
  
  function clearColorOptionEventListeners() {
      $('.color-option').each(function() {
          const $option = $(this);
          const $newOption = $option.clone(true);
          $option.replaceWith($newOption);
      });
  }

  function  fabricAnimationOnWidth() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      annotationFabric = new Annotation(scene, new THREE.Vector3(0, 0.70, 0), '/textures/fabric.png', 0.2, 0.1);
    } else {
      annotationFabric = new Annotation(scene, new THREE.Vector3(0, 0.55, 0.30), '/textures/fabric.png', 0.2, 0.1);
  
    }
  }
  
  function activateModifierBasedOnWidth() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    animateCamera(CAMERA, new THREE.Vector3(2.6, 0.35, 0));
  } else {
    animateCamera(CAMERA, new THREE.Vector3(2, 0.35, 0));

  }

  }
  function activateAnimationBodyPart() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      animateCamera(CAMERA, new THREE.Vector3(2.4, 0.35, 0));
  
    } else {
      animateCamera(CAMERA, new THREE.Vector3(1.8, 0.35, 0));
    }
  
    }
  function activateAnimationFabricPart() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      animateCamera(CAMERA, new THREE.Vector3(2, 1.4, 0));
  
    } else {
      animateCamera(CAMERA, new THREE.Vector3(1, 1.4, 0));
    }
  
    }
  function activateAnimationLacesPart() {
    if (window.matchMedia('(max-width: 768px)').matches) {
     animateCamera(CAMERA, new THREE.Vector3(0.4, 0.9, 0.5));
    } else {
      animateCamera(CAMERA, new THREE.Vector3(0.2, 0.7, 0.5));
    }
  
    }
  function activateAnimationLegsPart() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      animateCamera(CAMERA, new THREE.Vector3(1.9, -0.3, 0.2));
    } else {
       animateCamera(CAMERA, new THREE.Vector3(1.2, -0.3, 0.2));

    }
  
    }
  

  
      function bodyClicked() {
  
   $('.title-x .title').text('BODY COLOR')
   activateAnimationBodyPart()
  
  $('.upper-btns').css('display', 'none');
  clearColorOptionEventListeners()
      const colorOptions = document.querySelectorAll('.color-option');
      colorOptions.forEach(option => {
          document.querySelector('.color-chosen').textContent = $('.color-option.selected').data('name');
          option.style.display = 'flex';
          if (selectedBodyColor !== '') {
             
              if (option.dataset.color === selectedBodyColor) {
                  option.classList.add('selected'); 
                  
                  changeModelColor('metal_mat',selectedBodyColor,true);

              } else {
                  option.classList.remove('selected'); 
              }
          }else{
            changeModelColor('metal_mat', '#DFDFE1');
         
    //   Unlimited3D.changeMaterials({ partObjects: [ {parts: ['Body_metal_base', 'Body_metal_cover','fabric_base','fabric_cover','Handle_base1','Handle_metal-1','Handle_telescope-1','legs_base','legs_base_cover','legs_front_right_base','legs_front_left_base','legs_back_right_base','legs_back_left_base','legs_front_right_center','legs_front_left_center','legs_back_right_center','legs_back_left_centar'], material: '06 CHROME SATIN ALUMINUM'} ] });
          
  }
  // if (selectedBodyColor == '' && (selectedCornerColor !== '' || selectedHandleColor !== '' || selectedlegsColor !== '')) {
  //     option.classList.remove('selected');
  //     colorOptions[0].classList.add('selected');
  //     Unlimited3D.changeMaterials({
  //                 partObjects: [
  //                     { parts: ['Body_metal_base', 'Body_metal_cover' ], material: '06 CHROME SATIN ALUMINUM' }
  //                 ]
  //             });
  // }
  
  
          option.addEventListener('click', function() {
       
            // changeModelColor('fabric_mat', '#DFDFE1');
            // changeModelColor('metal_mat', '#444444');
            // changeModelColor('laces_matt', '#008000');
            // changeModelColor('wood_matt', '#008000');
            
              colorOptions.forEach(opt => opt.classList.remove('selected'));
              const element = this
      
              element.classList.add('selected');
              const newSelectedColor = element.dataset.color;
             
  
          if (newSelectedColor !== selectedBodyColor) {
            
              // Body color has changed
              selectedBodyColor = newSelectedColor; // Update the new selected color
              document.querySelector('.color-chosen').textContent = element.dataset.name;
              changeModelColor('metal_mat', selectedBodyColor);
              changeModelColor('fabric_mat', '#DFDFE1');
            changeModelColor('laces_mat', '#DFDFE1');
            changeModelColor('wood_mat', '#DFDFE1');
              // Update body materials with the new color
            //   Unlimited3D.changeMaterials({
            //       partObjects: [
            //           { parts: ['Body_metal_base', 'Body_metal_cover'], material: newSelectedColor }
            //       ]
            //   });
            //   Unlimited3D.changeMaterials({ partObjects: [ {parts: ['fabric_base', 'fabric_cover','Handle_base1','Handle_metal-1','Handle_telescope-1','legs_base','legs_base_cover','legs_front_right_base','legs_front_left_base','legs_back_right_base','legs_back_left_base','legs_front_right_center','legs_front_left_center','legs_back_right_center','legs_back_left_centar'], material: '06 CHROME SATIN ALUMINUM'} ] });
  
              selectedCornerColor = '#DFDFE1'
              selectedHandleColor = '#DFDFE1'
              selectedlegsColor = '#DFDFE1'
          }
  
          });
  
      });
       
      }
  
    function setupColorOptions(partType, selectedColor, defaultColor, partObjects) {
  const colorOptions = document.querySelectorAll('.color-option');
  document.querySelector('.color-chosen').textContent = $('.color-option.selected').data('name');
  colorOptions.forEach(option => {
      option.classList.remove('selected');
      if (selectedColor !== '') {
          if (option.dataset.color === selectedColor) {
              option.classList.add('selected');
              document.querySelector('.color-chosen').textContent = option.dataset.name;
          }
      } else {
          colorOptions[0].classList.add('selected');
          document.querySelector('.color-chosen').textContent = $('.color-option.selected').data('name');
      }
  
      if (previousBodyColor !== '' && selectedBodyColor !== previousBodyColor) {
          option.classList.remove('selected');
          colorOptions[0].classList.add('selected');
          changeModelColor(partObjects , defaultColor);
        //   Unlimited3D.changeMaterials({ partObjects: [{ parts: partObjects, material: defaultColor }] });
      } else {
        changeModelColor(partObjects , selectedColor);
        //   Unlimited3D.changeMaterials({ partObjects: [{ parts: partObjects, material: selectedColor }] });
      }
  
      option.addEventListener('click', function () {
          colorOptions.forEach(opt => opt.classList.remove('selected'));
          this.classList.add('selected');
          const newColor = this.dataset.color;
  
          // Set the correct global variable based on the part type
          switch (partType) {
              case 'fabric':
                  selectedCornerColor = newColor;
                  break;
              case 'laces':
                  selectedHandleColor = newColor;
                  break;
              case 'legs':
                  selectedlegsColor = newColor;
                  break;
              default:
                  break;
          }
  
          document.querySelector('.color-chosen').textContent = this.dataset.name;
          changeModelColor(partObjects , newColor);
        //   Unlimited3D.changeMaterials({ partObjects: [{ parts: partObjects, material: newColor }] });
      });
  });
  }
  
  function fabricClicked() {
  $('.title-x .title').text('fabric');
  activateAnimationFabricPart()
console.log(CAMERA);

//   activateModifierBasedOnWidth("camera_fabric_mobile", "camera_fabric");
  clearColorOptionEventListeners();
  updateColorOptions(selectedBodyColor);
  setupColorOptions('fabric', selectedCornerColor, '#DFDFE1', 'fabric_mat');
  }
  
  function lacesClicked() {
  $('.title-x .title').text('laces');
  activateAnimationLacesPart()
  clearColorOptionEventListeners();
  updateColorOptions(selectedBodyColor);
  setupColorOptions('laces', selectedHandleColor, '#DFDFE1', 'laces_mat');
  }
  
  function legsClicked() {
  $('.title-x .title').text('legs');
  activateAnimationLegsPart()
  clearColorOptionEventListeners();
  updateColorOptions(selectedBodyColor);
  setupColorOptions('legs', selectedlegsColor, '#DFDFE1', 'wood_mat');
  }
    
  function handleImageDisplay(inputSelector, shouldDisplay) {
    $(inputSelector).click(function () {
      $(".no-image, .no-image-text").css( "display", shouldDisplay ? "flex" : "none" ); });
  }
  
  handleImageDisplay("input#laces, input#fabric, input#legs", false);
  handleImageDisplay("input#body", true);
  
  $(".left-btn").on("click", function () {
    $(".color-options").animate({ scrollLeft: "-=100px" }, "smooth");
  });
  
  $(".right-btn").on("click", function () {
    $(".color-options").animate({ scrollLeft: "+=100px" }, "smooth");
  });
  