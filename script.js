var fEdit_Vertex,deleted_evene,copy_mesh,drawMode = false, moveMode = false, vertexEditMode = false, points = [], shapesToExtrude = [], shapesExtruded = [];
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);
const gizmoManager = new BABYLON.GizmoManager(scene);
const camera = new BABYLON.ArcRotateCamera(
  "UniversalCamera",
  Math.PI / 4, // alpha (rotation around Y-axis)
  Math.PI / 4, // beta (rotation around X-axis)
  60,          // radius (distance from target)
  BABYLON.Vector3.Zero(), // target (look-at point)
  scene
);

// Attach the camera to the canvas
camera.attachControl(canvas, true);

// Create a light
const light = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(0, 1, 0),
  scene
);
light.intensity = 0.7;

// Create the ground
var ground = BABYLON.MeshBuilder.CreateGround(
  "ground",
  { width: 80, height: 50 },
  scene
);

// Create a black material for the ground
var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
groundMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0); // Black color
ground.material = groundMaterial;

// Enable edge rendering for the ground
ground.enableEdgesRendering();
ground.edgesWidth = 5.0; // Set the edge width to 3 units
ground.edgesColor = new BABYLON.Color4(1, 1, 1, 1); // White color for the edges



// Handle pointer events
function handlePointer(pointerInfo) {
  if (drawMode) {
    var pickInfo = pointerInfo.pickInfo;
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        // Left-Click then accumulate the points and represent it on screen
        if (
          pointerInfo.event.inputIndex == 2 &&
          pickInfo.pickedMesh &&
          (pickInfo.pickedMesh.id === "ground" ||
            pickInfo.pickedMesh.id === "lines")
        ) {
          points.push(pickInfo.pickedPoint);
          // ---------------drow points from here 
          // Create a sphere marker
          const markerName = `marker_${Date.now()}`; // Use a unique name for the sphere
          const sphere = BABYLON.MeshBuilder.CreateSphere(
            markerName,
            { diameter: 0.2 },
            scene
          );
          sphere.position = pickInfo.pickedPoint;

          // Add material to the sphere
          const material = new BABYLON.StandardMaterial(`${markerName}_material`, scene);
          material.diffuseColor = new BABYLON.Color3(1, 1, 1); // Pure white color
          material.emissiveColor = new BABYLON.Color3(1, 1, 1); // White glow
          sphere.material = material;
          // ---------------drow points to here 

        }

        // Right-Click then draw the 2-D closed loop shape from points
        else if (pointerInfo.event.inputIndex == 4) {
          points.push(points[0]);
          var idx = shapesToExtrude.length;
          var lines = BABYLON.MeshBuilder.CreateLines(
            "lines" + idx.toString(),
            { points: points, updatable: true },
            scene
          );
          lines.color = new BABYLON.Color3(1, 0, 0);
          shapesToExtrude.push(points);
          points = [];
        }

        break;
    }
  }
}

function generateExtrusions() {
  shapesToExtrude.forEach((currentShape, index) => {
    // Ensure each shape is processed only once
    if (!shapesExtruded[index]) {
      shapesExtruded[index] = true; // Mark shape as processed

      // Create a unique identifier for the extrusion
      const extrusionId = `extrusion_${index}_${Date.now()}`;

      // Perform the extrusion
      const extrudedMesh = BABYLON.MeshBuilder.ExtrudePolygon(
        extrusionId,
        {
          shape: currentShape,
          depth: 5, // Height of extrusion
          updatable: false
        },
        scene
      );

      // Position the extruded shape
      extrudedMesh.position.y = 5; // Centered vertically for visual consistency

      // Apply material with random color
      const randomColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
      const meshMaterial = new BABYLON.StandardMaterial(`${extrusionId}_material`, scene);
      meshMaterial.diffuseColor = randomColor; // Base color
      meshMaterial.emissiveColor = randomColor.scale(0.5); // Glow effect
      extrudedMesh.material = meshMaterial;

      // Enable edge rendering with randomized edge properties
      extrudedMesh.enableEdgesRendering();
      extrudedMesh.edgesWidth = 2.0 + Math.random() * 3.0; // Random edge width between 2 and 5
      extrudedMesh.edgesColor = new BABYLON.Color4(0, 0, 0, 1); // Black edges
    }
  });
  for(var i=0;i<4;++i){
  scene.meshes.forEach((mesh) => {
    // Check if the mesh is a 2D shape by its name or other properties
    if (mesh.name.startsWith("lines") || mesh.name.startsWith("marker")) {
        mesh.dispose(); // Dispose the mesh
    }
});}
}

var startingPoint;
var currentMesh;

var getGroundPosition = function () {
  var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
  if (pickinfo.hit) {
    return pickinfo.pickedPoint;
  }

  return null;
}

var pointerDown = function (mesh) {
  currentMesh = mesh;
  startingPoint = getGroundPosition();
  if (startingPoint) { // we need to disconnect camera from canvas
    setTimeout(function () {
      camera.detachControl(canvas);
    }, 0);
  }
}

var pointerUp = function () {
  if (startingPoint) {
    camera.attachControl(canvas, true);
    startingPoint = null;
    return;
  }
}

var pointerMove = function () {
  if (!startingPoint) {
    return;
  }
  var current = getGroundPosition();
  if (!current) {
    return;
  }

  var diff = current.subtract(startingPoint);
  currentMesh.position.addInPlace(diff);

  startingPoint = current;

}
function dragMesh(pointerInfo) {
  switch (pointerInfo.type) {
    case BABYLON.PointerEventTypes.POINTERDOWN:
      if (pointerInfo.pickInfo.hit && pointerInfo.pickInfo.pickedMesh != ground) {
        pointerDown(pointerInfo.pickInfo.pickedMesh)
      }
      break;
    case BABYLON.PointerEventTypes.POINTERUP:
      pointerUp();
      break;
    case BABYLON.PointerEventTypes.POINTERMOVE:
      pointerMove();
      break;
  }
}

// Global Variables
let sphereHandles = [];

// Function to Highlight Upper Vertices
// Function to Enter Edit Mode
function enterEditMode(mesh) {
  const scene = mesh.getScene();
  let dragging = false;
  let pickedFace = null;
  let dragStartPoint = null;

  scene.onPointerObservable.add((pointerInfo) => {
      switch (pointerInfo.type) {
          case BABYLON.PointerEventTypes.POINTERDOWN:
              const pickResult = scene.pick(scene.pointerX, scene.pointerY);
              if (pickResult.hit && pickResult.pickedMesh === mesh) {
                  const indices = mesh.getIndices();
                  const positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                  pickedFace = pickResult.faceId;
                  dragStartPoint = pickResult.pickedPoint;

                  if (pickedFace !== null && indices && positions) {
                      dragging = true;
                  }
              }
              break;

          case BABYLON.PointerEventTypes.POINTERUP:
              dragging = false;
              pickedFace = null;
              dragStartPoint = null;
              break;

          case BABYLON.PointerEventTypes.POINTERMOVE:
              if (dragging && pickedFace !== null) {
                  const indices = mesh.getIndices();
                  const positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
                  const pickResult = scene.pick(scene.pointerX, scene.pointerY);

                  if (pickResult && pickResult.pickedPoint && positions && indices) {
                      const dragEndPoint = pickResult.pickedPoint;
                      const dragDelta = dragEndPoint.subtract(dragStartPoint);
                      dragStartPoint = dragEndPoint;

                      const vertexIndices = [
                          indices[pickedFace * 3],
                          indices[pickedFace * 3 + 1],
                          indices[pickedFace * 3 + 2],
                      ];

                      for (let vertexIndex of vertexIndices) {
                          const i = vertexIndex * 3;
                          positions[i] += dragDelta.x;
                          positions[i + 1] += dragDelta.y;
                          positions[i + 2] += dragDelta.z;
                      }

                      mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
                  }
              }
              break;
      }
  });
}


function Edit_Vertex_and_edges(pointerInfo){
  if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
    const pickInfo = pointerInfo.pickInfo;
    if (pickInfo.hit && pickInfo.pickedMesh) {
        const selectedMesh = pickInfo.pickedMesh;
        enterEditMode(selectedMesh);
    }
}
}
function deleted_mesh(pointerInfo){
  if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
    const pickInfo = pointerInfo.pickInfo;
    if (pickInfo.hit && pickInfo.pickedMesh) {
        const selectedMesh = pickInfo.pickedMesh;
        if(selectedMesh.id!="ground"){
          selectedMesh.dispose();
        }
      }
      scene.onPointerObservable.remove(deleted_evene);}
}
function copymesh(pointerInfo){
  if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
    const pickInfo = pointerInfo.pickInfo;
    if (pickInfo.hit && pickInfo.pickedMesh) {
        const selectedMesh = pickInfo.pickedMesh;
        if(selectedMesh.id!="ground"){
          const vertexData = BABYLON.VertexData.ExtractFromMesh(selectedMesh);
          // Create a new mesh
          const newMesh = new BABYLON.Mesh("newBox", scene);
          vertexData.applyToMesh(newMesh);

          // Move the new mesh to a new position
          newMesh.position.x -= 5;
          newMesh.position.y += 5;
          scene.onPointerObservable.remove(copy_mesh);
      }
    }
}
}
function deepcopymesh(pointerInfo){
  if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERPICK) {
    const pickInfo = pointerInfo.pickInfo;
    if (pickInfo.hit && pickInfo.pickedMesh) {
        const selectedMesh = pickInfo.pickedMesh;
        if(selectedMesh.id!="ground"){
          const clonedMesh = selectedMesh.clone("clonedBox");

          // Move the cloned mesh to a new position
          clonedMesh.position.x += 3;
          
          scene.onPointerObservable.remove(fEdit_Vertex);
      }
    }
}
}
var Draw_Shape,Move_Shape,Edit_Vertex;
document.getElementById("Draw_Shape").addEventListener("click", () => {
  drawMode = true;
  moveMode = false;
  vertexEditMode = false;
  extrudeMode = false;
  scene.onPointerObservable.remove(Move_Shape);
  scene.onPointerObservable.remove(Edit_Vertex);
  Draw_Shape = scene.onPointerObservable.add(handlePointer);
})
document.getElementById("Extrude").addEventListener("click", () => {
  drawMode = false;
  moveMode = false;
  vertexEditMode = false;
  extrudeMode = false;
  generateExtrusions()
  scene.onPointerObservable.remove(Draw_Shape);
  scene.onPointerObservable.remove(Edit_Vertex);
  scene.onPointerObservable.remove(Move_Shape);
})
document.getElementById("Move_Shape").addEventListener("click", () => {
  drawMode = false;
  moveMode = true;
  vertexEditMode = false;
  extrudeMode = false;
  scene.onPointerObservable.remove(Draw_Shape);
  scene.onPointerObservable.remove(Edit_Vertex);
  Move_Shape= scene.onPointerObservable.add(dragMesh);
})
document.getElementById("shapeSelector").addEventListener("click", (event) => {
  const selectedShape = event.target.value;

  if (selectedShape === "sphere") {
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 8 }, scene); // Diameter = 2 * radius
    sphere.position.y=4
  } else if (selectedShape === "cube") {
    const cube = BABYLON.MeshBuilder.CreateBox("cube", { size: 8 }, scene); // Size = side length
    cube.position.y=4
  }
});
var temp1=0
document.getElementById("Gizmos").addEventListener("click", () => {
  if(temp1%2==0){
  gizmoManager.www=true
  // Enable translation, rotation, and scaling gizmos
  gizmoManager.positionGizmoEnabled = true; // Enables movement gizmo
  gizmoManager.rotationGizmoEnabled = true; // Enables rotation gizmo
  gizmoManager.scaleGizmoEnabled = true; // Enables scaling gizmo
   
  }
  else{

    gizmoManager.www=false
  // Enable translation, rotation, and scaling gizmos
  gizmoManager.positionGizmoEnabled = false; // Enables movement gizmo
  gizmoManager.rotationGizmoEnabled = false; // Enables rotation gizmo
  gizmoManager.scaleGizmoEnabled = false; // Enables scaling gizmo
  }
   temp1++
})
document.getElementById("DeleteMesh").addEventListener("click", () => {
  deleted_evene=scene.onPointerObservable.add(deleted_mesh);
})
document.getElementById("fMove_Shape").addEventListener("click", () => {
  copy_mesh=scene.onPointerObservable.add(copymesh);
})
document.getElementById("fEdit_Vertex").addEventListener("click", () => {
  fEdit_Vertex=scene.onPointerObservable.add(deepcopymesh);
})

// Render loop
engine.runRenderLoop(function () {
  scene.render();
});