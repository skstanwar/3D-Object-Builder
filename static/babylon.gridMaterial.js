(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require("babylonjs"));
    else if (typeof define === 'function' && define.amd)
        define("babylonjs-materials", ["babylonjs"], factory);
    else if (typeof exports === 'object')
        exports["babylonjs-materials"] = factory(require("babylonjs"));
    else
        root["MATERIALS"] = factory(root["BABYLON"]);
})((typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this), (__WEBPACK_EXTERNAL_MODULE_babylonjs_Materials_effect__) => {
    return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../dev/materials/src/grid/grid.fragment.ts":
/*!********************************************************!*\
  !*** ../../../dev/materials/src/grid/grid.fragment.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gridPixelShader: () => (/* binding */ gridPixelShader)
                        /* harmony export */
});
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/imageProcessingCompatibility */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
                    // Do not edit.






                    var name = "gridPixelShader";
                    var shader = "#extension GL_OES_standard_derivatives : enable\n#define SQRT2 1.41421356\n#define PI 3.14159\nprecision highp float;uniform float visibility;uniform vec3 mainColor;uniform vec3 lineColor;uniform vec4 gridControl;uniform vec3 gridOffset;varying vec3 vPosition;varying vec3 vNormal;\n#ifdef LOGARITHMICDEPTH\n#extension GL_EXT_frag_depth : enable\n#endif\n#include<logDepthDeclaration>\n#include<fogFragmentDeclaration>\n#ifdef OPACITY\nvarying vec2 vOpacityUV;uniform sampler2D opacitySampler;uniform vec2 vOpacityInfos;\n#endif\nfloat getDynamicVisibility(float position) {float majorGridFrequency=gridControl.y;if (floor(position+0.5)==floor(position/majorGridFrequency+0.5)*majorGridFrequency)\n{return 1.0;}\nreturn gridControl.z;}\nfloat getAnisotropicAttenuation(float differentialLength) {const float maxNumberOfLines=10.0;return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines,0.0,1.0);}\nfloat isPointOnLine(float position,float differentialLength) {float fractionPartOfPosition=position-floor(position+0.5); \nfractionPartOfPosition/=differentialLength; \n#ifdef ANTIALIAS\nfractionPartOfPosition=clamp(fractionPartOfPosition,-1.,1.);float result=0.5+0.5*cos(fractionPartOfPosition*PI); \nreturn result;\n#else\nreturn abs(fractionPartOfPosition)<SQRT2/4. ? 1. : 0.;\n#endif\n}\nfloat contributionOnAxis(float position) {float differentialLength=length(vec2(dFdx(position),dFdy(position)));differentialLength*=SQRT2; \nfloat result=isPointOnLine(position,differentialLength);float dynamicVisibility=getDynamicVisibility(position);result*=dynamicVisibility;float anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);result*=anisotropicAttenuation;return result;}\nfloat normalImpactOnAxis(float x) {float normalImpact=clamp(1.0-3.0*abs(x*x*x),0.0,1.0);return normalImpact;}\n#define CUSTOM_FRAGMENT_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_FRAGMENT_MAIN_BEGIN\nfloat gridRatio=gridControl.x;vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;float x=contributionOnAxis(gridPos.x);float y=contributionOnAxis(gridPos.y);float z=contributionOnAxis(gridPos.z);vec3 normal=normalize(vNormal);x*=normalImpactOnAxis(normal.x);y*=normalImpactOnAxis(normal.y);z*=normalImpactOnAxis(normal.z);\n#ifdef MAX_LINE\nfloat grid=clamp(max(max(x,y),z),0.,1.);\n#else\nfloat grid=clamp(x+y+z,0.,1.);\n#endif\nvec3 color=mix(mainColor,lineColor,grid);\n#ifdef FOG\n#include<fogFragment>\n#endif\nfloat opacity=1.0;\n#ifdef TRANSPARENT\nopacity=clamp(grid,0.08,gridControl.w*grid);\n#endif\n#ifdef OPACITY\nopacity*=texture2D(opacitySampler,vOpacityUV).a;\n#endif\ngl_FragColor=vec4(color.rgb,opacity*visibility);\n#ifdef TRANSPARENT\n#ifdef PREMULTIPLYALPHA\ngl_FragColor.rgb*=opacity;\n#endif\n#else\n#endif\n#include<logDepthFragment>\n#include<imageProcessingCompatibility>\n#define CUSTOM_FRAGMENT_MAIN_END\n}\n";
                    // Sideeffect
                    babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
                    /** @internal */
                    var gridPixelShader = { name: name, shader: shader };


                    /***/
}),

/***/ "../../../dev/materials/src/grid/grid.vertex.ts":
/*!******************************************************!*\
  !*** ../../../dev/materials/src/grid/grid.vertex.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gridVertexShader: () => (/* binding */ gridVertexShader)
                        /* harmony export */
});
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Shaders/ShadersInclude/logDepthVertex */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__);
                    // Do not edit.







                    var name = "gridVertexShader";
                    var shader = "precision highp float;attribute vec3 position;attribute vec3 normal;\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#include<instancesDeclaration>\nuniform mat4 projection;uniform mat4 view;varying vec3 vPosition;varying vec3 vNormal;\n#include<logDepthDeclaration>\n#include<fogVertexDeclaration>\n#ifdef OPACITY\nvarying vec2 vOpacityUV;uniform mat4 opacityMatrix;uniform vec2 vOpacityInfos;\n#endif\n#define CUSTOM_VERTEX_DEFINITIONS\nvoid main(void) {\n#define CUSTOM_VERTEX_MAIN_BEGIN\n#include<instancesVertex>\nvec4 worldPos=finalWorld*vec4(position,1.0);\n#include<fogVertex>\nvec4 cameraSpacePosition=view*worldPos;gl_Position=projection*cameraSpacePosition;\n#ifdef OPACITY\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\nif (vOpacityInfos.x==0.)\n{vOpacityUV=vec2(opacityMatrix*vec4(uv,1.0,0.0));}\nelse\n{vOpacityUV=vec2(opacityMatrix*vec4(uv2,1.0,0.0));}\n#endif \n#include<logDepthVertex>\nvPosition=position;vNormal=normal;\n#define CUSTOM_VERTEX_MAIN_END\n}";
                    // Sideeffect
                    babylonjs_Engines_shaderStore__WEBPACK_IMPORTED_MODULE_0__.ShaderStore.ShadersStore[name] = shader;
                    /** @internal */
                    var gridVertexShader = { name: name, shader: shader };


                    /***/
}),

/***/ "../../../dev/materials/src/grid/gridMaterial.ts":
/*!*******************************************************!*\
  !*** ../../../dev/materials/src/grid/gridMaterial.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridMaterial: () => (/* binding */ GridMaterial)
                        /* harmony export */
});
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../../../../node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs/Materials/materialHelper.functions */ "babylonjs/Materials/effect");
/* harmony import */ var babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grid_fragment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid.fragment */ "../../../dev/materials/src/grid/grid.fragment.ts");
/* harmony import */ var _grid_vertex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grid.vertex */ "../../../dev/materials/src/grid/grid.vertex.ts");

                    /* eslint-disable @typescript-eslint/naming-convention */












                    var GridMaterialDefines = /** @class */ (function (_super) {
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(GridMaterialDefines, _super);
                        function GridMaterialDefines() {
                            var _this = _super.call(this) || this;
                            _this.OPACITY = false;
                            _this.ANTIALIAS = false;
                            _this.TRANSPARENT = false;
                            _this.FOG = false;
                            _this.PREMULTIPLYALPHA = false;
                            _this.MAX_LINE = false;
                            _this.UV1 = false;
                            _this.UV2 = false;
                            _this.INSTANCES = false;
                            _this.THIN_INSTANCES = false;
                            _this.IMAGEPROCESSINGPOSTPROCESS = false;
                            _this.SKIPFINALCOLORCLAMP = false;
                            _this.LOGARITHMICDEPTH = false;
                            _this.rebuild();
                            return _this;
                        }
                        return GridMaterialDefines;
                    }(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialDefines));
                    /**
                     * The grid materials allows you to wrap any shape with a grid.
                     * Colors are customizable.
                     */
                    var GridMaterial = /** @class */ (function (_super) {
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(GridMaterial, _super);
                        /**
                         * constructor
                         * @param name The name given to the material in order to identify it afterwards.
                         * @param scene The scene the material is used in.
                         */
                        function GridMaterial(name, scene) {
                            var _this = _super.call(this, name, scene) || this;
                            /**
                             * Main color of the grid (e.g. between lines)
                             */
                            _this.mainColor = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3.Black();
                            /**
                             * Color of the grid lines.
                             */
                            _this.lineColor = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Color3.Teal();
                            /**
                             * The scale of the grid compared to unit.
                             */
                            _this.gridRatio = 1.0;
                            /**
                             * Allows setting an offset for the grid lines.
                             */
                            _this.gridOffset = babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Vector3.Zero();
                            /**
                             * The frequency of thicker lines.
                             */
                            _this.majorUnitFrequency = 10;
                            /**
                             * The visibility of minor units in the grid.
                             */
                            _this.minorUnitVisibility = 0.33;
                            /**
                             * The grid opacity outside of the lines.
                             */
                            _this.opacity = 1.0;
                            /**
                             * Whether to antialias the grid
                             */
                            _this.antialias = true;
                            /**
                             * Determine RBG output is premultiplied by alpha value.
                             */
                            _this.preMultiplyAlpha = false;
                            /**
                             * Determines if the max line value will be used instead of the sum wherever grid lines intersect.
                             */
                            _this.useMaxLine = false;
                            _this._gridControl = new babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.Vector4(_this.gridRatio, _this.majorUnitFrequency, _this.minorUnitVisibility, _this.opacity);
                            return _this;
                        }
                        /**
                         * @returns whether or not the grid requires alpha blending.
                         */
                        GridMaterial.prototype.needAlphaBlending = function () {
                            return this.opacity < 1.0 || (this._opacityTexture && this._opacityTexture.isReady());
                        };
                        GridMaterial.prototype.needAlphaBlendingForMesh = function (mesh) {
                            return mesh.visibility < 1.0 || this.needAlphaBlending();
                        };
                        GridMaterial.prototype.isReadyForSubMesh = function (mesh, subMesh, useInstances) {
                            var drawWrapper = subMesh._drawWrapper;
                            if (this.isFrozen) {
                                if (drawWrapper.effect && drawWrapper._wasPreviouslyReady && drawWrapper._wasPreviouslyUsingInstances === useInstances) {
                                    return true;
                                }
                            }
                            if (!subMesh.materialDefines) {
                                subMesh.materialDefines = new GridMaterialDefines();
                            }
                            var defines = subMesh.materialDefines;
                            var scene = this.getScene();
                            if (this._isReadyForSubMesh(subMesh)) {
                                return true;
                            }
                            if (defines.TRANSPARENT !== this.opacity < 1.0) {
                                defines.TRANSPARENT = !defines.TRANSPARENT;
                                defines.markAsUnprocessed();
                            }
                            if (defines.PREMULTIPLYALPHA != this.preMultiplyAlpha) {
                                defines.PREMULTIPLYALPHA = !defines.PREMULTIPLYALPHA;
                                defines.markAsUnprocessed();
                            }
                            if (defines.MAX_LINE !== this.useMaxLine) {
                                defines.MAX_LINE = !defines.MAX_LINE;
                                defines.markAsUnprocessed();
                            }
                            if (defines.ANTIALIAS !== this.antialias) {
                                defines.ANTIALIAS = !defines.ANTIALIAS;
                                defines.markAsUnprocessed();
                            }
                            // Textures
                            if (defines._areTexturesDirty) {
                                defines._needUVs = false;
                                if (scene.texturesEnabled) {
                                    if (this._opacityTexture && babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialFlags.OpacityTextureEnabled) {
                                        if (!this._opacityTexture.isReady()) {
                                            return false;
                                        }
                                        else {
                                            defines._needUVs = true;
                                            defines.OPACITY = true;
                                        }
                                    }
                                }
                            }
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForMisc)(mesh, scene, this._useLogarithmicDepth, false, this.fogEnabled, false, defines);
                            // Values that need to be evaluated on every frame
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForFrameBoundValues)(scene, scene.getEngine(), this, defines, !!useInstances);
                            // Get correct effect
                            if (defines.isDirty) {
                                defines.markAsProcessed();
                                scene.resetCachedMaterial();
                                // Attributes
                                (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareDefinesForAttributes)(mesh, defines, false, false);
                                var attribs = [babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.PositionKind, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.NormalKind];
                                if (defines.UV1) {
                                    attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UVKind);
                                }
                                if (defines.UV2) {
                                    attribs.push(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.VertexBuffer.UV2Kind);
                                }
                                defines.IMAGEPROCESSINGPOSTPROCESS = scene.imageProcessingConfiguration.applyByPostProcess;
                                (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PrepareAttributesForInstances)(attribs, defines);
                                // Defines
                                var join = defines.toString();
                                subMesh.setEffect(scene
                                    .getEngine()
                                    .createEffect("grid", attribs, [
                                        "projection",
                                        "mainColor",
                                        "lineColor",
                                        "gridControl",
                                        "gridOffset",
                                        "vFogInfos",
                                        "vFogColor",
                                        "world",
                                        "view",
                                        "opacityMatrix",
                                        "vOpacityInfos",
                                        "visibility",
                                        "logarithmicDepthConstant",
                                    ], ["opacitySampler"], join, undefined, this.onCompiled, this.onError), defines, this._materialContext);
                            }
                            if (!subMesh.effect || !subMesh.effect.isReady()) {
                                return false;
                            }
                            defines._renderId = scene.getRenderId();
                            drawWrapper._wasPreviouslyReady = true;
                            drawWrapper._wasPreviouslyUsingInstances = !!useInstances;
                            return true;
                        };
                        GridMaterial.prototype.bindForSubMesh = function (world, mesh, subMesh) {
                            var scene = this.getScene();
                            var defines = subMesh.materialDefines;
                            if (!defines) {
                                return;
                            }
                            var effect = subMesh.effect;
                            if (!effect) {
                                return;
                            }
                            this._activeEffect = effect;
                            this._activeEffect.setFloat("visibility", mesh.visibility);
                            // Matrices
                            if (!defines.INSTANCES || defines.THIN_INSTANCE) {
                                this.bindOnlyWorldMatrix(world);
                            }
                            this._activeEffect.setMatrix("view", scene.getViewMatrix());
                            this._activeEffect.setMatrix("projection", scene.getProjectionMatrix());
                            // Uniforms
                            if (this._mustRebind(scene, effect, subMesh)) {
                                this._activeEffect.setColor3("mainColor", this.mainColor);
                                this._activeEffect.setColor3("lineColor", this.lineColor);
                                this._activeEffect.setVector3("gridOffset", this.gridOffset);
                                this._gridControl.x = this.gridRatio;
                                this._gridControl.y = Math.round(this.majorUnitFrequency);
                                this._gridControl.z = this.minorUnitVisibility;
                                this._gridControl.w = this.opacity;
                                this._activeEffect.setVector4("gridControl", this._gridControl);
                                if (this._opacityTexture && babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.MaterialFlags.OpacityTextureEnabled) {
                                    this._activeEffect.setTexture("opacitySampler", this._opacityTexture);
                                    this._activeEffect.setFloat2("vOpacityInfos", this._opacityTexture.coordinatesIndex, this._opacityTexture.level);
                                    this._activeEffect.setMatrix("opacityMatrix", this._opacityTexture.getTextureMatrix());
                                }
                                // Log. depth
                                if (this._useLogarithmicDepth) {
                                    (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindLogDepth)(defines, effect, scene);
                                }
                            }
                            // Fog
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.BindFogParameters)(scene, mesh, this._activeEffect);
                            this._afterBind(mesh, this._activeEffect, subMesh);
                        };
                        /**
                         * Dispose the material and its associated resources.
                         * @param forceDisposeEffect will also dispose the used effect when true
                         */
                        GridMaterial.prototype.dispose = function (forceDisposeEffect) {
                            _super.prototype.dispose.call(this, forceDisposeEffect);
                        };
                        GridMaterial.prototype.clone = function (name) {
                            var _this = this;
                            return babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Clone(function () { return new GridMaterial(name, _this.getScene()); }, this);
                        };
                        GridMaterial.prototype.serialize = function () {
                            var serializationObject = _super.prototype.serialize.call(this);
                            serializationObject.customType = "BABYLON.GridMaterial";
                            return serializationObject;
                        };
                        GridMaterial.prototype.getClassName = function () {
                            return "GridMaterial";
                        };
                        GridMaterial.Parse = function (source, scene, rootUrl) {
                            return babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.SerializationHelper.Parse(function () { return new GridMaterial(source.name, scene); }, source, scene, rootUrl);
                        };
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
                        ], GridMaterial.prototype, "mainColor", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsColor3)()
                        ], GridMaterial.prototype, "lineColor", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
                        ], GridMaterial.prototype, "gridRatio", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsVector3)()
                        ], GridMaterial.prototype, "gridOffset", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
                        ], GridMaterial.prototype, "majorUnitFrequency", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
                        ], GridMaterial.prototype, "minorUnitVisibility", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
                        ], GridMaterial.prototype, "opacity", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
                        ], GridMaterial.prototype, "antialias", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
                        ], GridMaterial.prototype, "preMultiplyAlpha", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serialize)()
                        ], GridMaterial.prototype, "useMaxLine", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.serializeAsTexture)("opacityTexture")
                        ], GridMaterial.prototype, "_opacityTexture", void 0);
                        (0, tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
                            (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.expandToProperty)("_markAllSubMeshesAsTexturesDirty")
                        ], GridMaterial.prototype, "opacityTexture", void 0);
                        return GridMaterial;
                    }(babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.PushMaterial));
                    (0, babylonjs_Misc_decorators__WEBPACK_IMPORTED_MODULE_0__.RegisterClass)("BABYLON.GridMaterial", GridMaterial);


                    /***/
}),

/***/ "../../../dev/materials/src/grid/index.ts":
/*!************************************************!*\
  !*** ../../../dev/materials/src/grid/index.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridMaterial: () => (/* reexport safe */ _gridMaterial__WEBPACK_IMPORTED_MODULE_0__.GridMaterial)
                        /* harmony export */
});
/* harmony import */ var _gridMaterial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gridMaterial */ "../../../dev/materials/src/grid/gridMaterial.ts");



                    /***/
}),

/***/ "../../../lts/materials/src/legacy/legacy-grid.ts":
/*!********************************************************!*\
  !*** ../../../lts/materials/src/legacy/legacy-grid.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GridMaterial: () => (/* reexport safe */ materials_grid_index__WEBPACK_IMPORTED_MODULE_0__.GridMaterial)
                        /* harmony export */
});
/* harmony import */ var materials_grid_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! materials/grid/index */ "../../../dev/materials/src/grid/index.ts");
                    /* eslint-disable import/no-internal-modules */

                    /**
                     * This is the entry point for the UMD module.
                     * The entry point for a future ESM package should be index.ts
                     */
                    var globalObject = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : undefined;
                    if (typeof globalObject !== "undefined") {
                        for (var key in materials_grid_index__WEBPACK_IMPORTED_MODULE_0__) {
                            globalObject.BABYLON[key] = materials_grid_index__WEBPACK_IMPORTED_MODULE_0__[key];
                        }
                    }



                    /***/
}),

/***/ "babylonjs/Materials/effect":
/*!****************************************************************************************************!*\
  !*** external {"root":"BABYLON","commonjs":"babylonjs","commonjs2":"babylonjs","amd":"babylonjs"} ***!
  \****************************************************************************************************/
/***/ ((module) => {

                    module.exports = __WEBPACK_EXTERNAL_MODULE_babylonjs_Materials_effect__;

                    /***/
}),

/***/ "../../../../node_modules/tslib/tslib.es6.mjs":
/*!****************************************************!*\
  !*** ../../../../node_modules/tslib/tslib.es6.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

                    __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                        /* harmony export */
});
                    /******************************************************************************
                    Copyright (c) Microsoft Corporation.
                    
                    Permission to use, copy, modify, and/or distribute this software for any
                    purpose with or without fee is hereby granted.
                    
                    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
                    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
                    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
                    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
                    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
                    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
                    PERFORMANCE OF THIS SOFTWARE.
                    ***************************************************************************** */
                    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

                    var extendStatics = function (d, b) {
                        extendStatics = Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
                        return extendStatics(d, b);
                    };

                    function __extends(d, b) {
                        if (typeof b !== "function" && b !== null)
                            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
                        extendStatics(d, b);
                        function __() { this.constructor = d; }
                        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
                    }

                    var __assign = function () {
                        __assign = Object.assign || function __assign(t) {
                            for (var s, i = 1, n = arguments.length; i < n; i++) {
                                s = arguments[i];
                                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                            }
                            return t;
                        }
                        return __assign.apply(this, arguments);
                    }

                    function __rest(s, e) {
                        var t = {};
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                            t[p] = s[p];
                        if (s != null && typeof Object.getOwnPropertySymbols === "function")
                            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                                    t[p[i]] = s[p[i]];
                            }
                        return t;
                    }

                    function __decorate(decorators, target, key, desc) {
                        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
                        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
                        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
                        return c > 3 && r && Object.defineProperty(target, key, r), r;
                    }

                    function __param(paramIndex, decorator) {
                        return function (target, key) { decorator(target, key, paramIndex); }
                    }

                    function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
                        function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
                        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
                        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
                        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
                        var _, done = false;
                        for (var i = decorators.length - 1; i >= 0; i--) {
                            var context = {};
                            for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
                            for (var p in contextIn.access) context.access[p] = contextIn.access[p];
                            context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
                            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
                            if (kind === "accessor") {
                                if (result === void 0) continue;
                                if (result === null || typeof result !== "object") throw new TypeError("Object expected");
                                if (_ = accept(result.get)) descriptor.get = _;
                                if (_ = accept(result.set)) descriptor.set = _;
                                if (_ = accept(result.init)) initializers.unshift(_);
                            }
                            else if (_ = accept(result)) {
                                if (kind === "field") initializers.unshift(_);
                                else descriptor[key] = _;
                            }
                        }
                        if (target) Object.defineProperty(target, contextIn.name, descriptor);
                        done = true;
                    };

                    function __runInitializers(thisArg, initializers, value) {
                        var useValue = arguments.length > 2;
                        for (var i = 0; i < initializers.length; i++) {
                            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
                        }
                        return useValue ? value : void 0;
                    };

                    function __propKey(x) {
                        return typeof x === "symbol" ? x : "".concat(x);
                    };

                    function __setFunctionName(f, name, prefix) {
                        if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
                        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
                    };

                    function __metadata(metadataKey, metadataValue) {
                        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
                    }

                    function __awaiter(thisArg, _arguments, P, generator) {
                        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
                        return new (P || (P = Promise))(function (resolve, reject) {
                            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
                            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
                            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
                            step((generator = generator.apply(thisArg, _arguments || [])).next());
                        });
                    }

                    function __generator(thisArg, body) {
                        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
                        return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
                        function verb(n) { return function (v) { return step([n, v]); }; }
                        function step(op) {
                            if (f) throw new TypeError("Generator is already executing.");
                            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                                if (y = 0, t) op = [op[0] & 2, t.value];
                                switch (op[0]) {
                                    case 0: case 1: t = op; break;
                                    case 4: _.label++; return { value: op[1], done: false };
                                    case 5: _.label++; y = op[1]; op = [0]; continue;
                                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                                    default:
                                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                                        if (t[2]) _.ops.pop();
                                        _.trys.pop(); continue;
                                }
                                op = body.call(thisArg, _);
                            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
                            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
                        }
                    }

                    var __createBinding = Object.create ? (function (o, m, k, k2) {
                        if (k2 === undefined) k2 = k;
                        var desc = Object.getOwnPropertyDescriptor(m, k);
                        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
                            desc = { enumerable: true, get: function () { return m[k]; } };
                        }
                        Object.defineProperty(o, k2, desc);
                    }) : (function (o, m, k, k2) {
                        if (k2 === undefined) k2 = k;
                        o[k2] = m[k];
                    });

                    function __exportStar(m, o) {
                        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
                    }

                    function __values(o) {
                        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
                        if (m) return m.call(o);
                        if (o && typeof o.length === "number") return {
                            next: function () {
                                if (o && i >= o.length) o = void 0;
                                return { value: o && o[i++], done: !o };
                            }
                        };
                        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
                    }

                    function __read(o, n) {
                        var m = typeof Symbol === "function" && o[Symbol.iterator];
                        if (!m) return o;
                        var i = m.call(o), r, ar = [], e;
                        try {
                            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
                        }
                        catch (error) { e = { error: error }; }
                        finally {
                            try {
                                if (r && !r.done && (m = i["return"])) m.call(i);
                            }
                            finally { if (e) throw e.error; }
                        }
                        return ar;
                    }

                    /** @deprecated */
                    function __spread() {
                        for (var ar = [], i = 0; i < arguments.length; i++)
                            ar = ar.concat(__read(arguments[i]));
                        return ar;
                    }

                    /** @deprecated */
                    function __spreadArrays() {
                        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
                        for (var r = Array(s), k = 0, i = 0; i < il; i++)
                            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                                r[k] = a[j];
                        return r;
                    }

                    function __spreadArray(to, from, pack) {
                        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
                            if (ar || !(i in from)) {
                                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                                ar[i] = from[i];
                            }
                        }
                        return to.concat(ar || Array.prototype.slice.call(from));
                    }

                    function __await(v) {
                        return this instanceof __await ? (this.v = v, this) : new __await(v);
                    }

                    function __asyncGenerator(thisArg, _arguments, generator) {
                        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                        var g = generator.apply(thisArg, _arguments || []), i, q = [];
                        return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
                        function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
                        function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
                        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
                        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
                        function fulfill(value) { resume("next", value); }
                        function reject(value) { resume("throw", value); }
                        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
                    }

                    function __asyncDelegator(o) {
                        var i, p;
                        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
                        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
                    }

                    function __asyncValues(o) {
                        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                        var m = o[Symbol.asyncIterator], i;
                        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
                        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
                        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
                    }

                    function __makeTemplateObject(cooked, raw) {
                        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
                        return cooked;
                    };

                    var __setModuleDefault = Object.create ? (function (o, v) {
                        Object.defineProperty(o, "default", { enumerable: true, value: v });
                    }) : function (o, v) {
                        o["default"] = v;
                    };

                    function __importStar(mod) {
                        if (mod && mod.__esModule) return mod;
                        var result = {};
                        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
                        __setModuleDefault(result, mod);
                        return result;
                    }

                    function __importDefault(mod) {
                        return (mod && mod.__esModule) ? mod : { default: mod };
                    }

                    function __classPrivateFieldGet(receiver, state, kind, f) {
                        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
                        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
                        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
                    }

                    function __classPrivateFieldSet(receiver, state, value, kind, f) {
                        if (kind === "m") throw new TypeError("Private method is not writable");
                        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
                        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
                        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
                    }

                    function __classPrivateFieldIn(state, receiver) {
                        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
                        return typeof state === "function" ? receiver === state : state.has(receiver);
                    }

                    function __addDisposableResource(env, value, async) {
                        if (value !== null && value !== void 0) {
                            if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
                            var dispose, inner;
                            if (async) {
                                if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
                                dispose = value[Symbol.asyncDispose];
                            }
                            if (dispose === void 0) {
                                if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
                                dispose = value[Symbol.dispose];
                                if (async) inner = dispose;
                            }
                            if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
                            if (inner) dispose = function () { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
                            env.stack.push({ value: value, dispose: dispose, async: async });
                        }
                        else if (async) {
                            env.stack.push({ async: true });
                        }
                        return value;
                    }

                    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
                        var e = new Error(message);
                        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
                    };

                    function __disposeResources(env) {
                        function fail(e) {
                            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
                            env.hasError = true;
                        }
                        var r, s = 0;
                        function next() {
                            while (r = env.stack.pop()) {
                                try {
                                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                                    if (r.dispose) {
                                        var result = r.dispose.call(r.value);
                                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
                                    }
                                    else s |= 1;
                                }
                                catch (e) {
                                    fail(e);
                                }
                            }
                            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
                            if (env.hasError) throw env.error;
                        }
                        return next();
                    }

                    function __rewriteRelativeImportExtension(path, preserveJsx) {
                        if (typeof path === "string" && /^\.\.?\//.test(path)) {
                            return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
                                return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
                            });
                        }
                        return path;
                    }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
                        __extends,
                        __assign,
                        __rest,
                        __decorate,
                        __param,
                        __esDecorate,
                        __runInitializers,
                        __propKey,
                        __setFunctionName,
                        __metadata,
                        __awaiter,
                        __generator,
                        __createBinding,
                        __exportStar,
                        __values,
                        __read,
                        __spread,
                        __spreadArrays,
                        __spreadArray,
                        __await,
                        __asyncGenerator,
                        __asyncDelegator,
                        __asyncValues,
                        __makeTemplateObject,
                        __importStar,
                        __importDefault,
                        __classPrivateFieldGet,
                        __classPrivateFieldSet,
                        __classPrivateFieldIn,
                        __addDisposableResource,
                        __disposeResources,
                        __rewriteRelativeImportExtension,
                    });


                    /***/
})

            /******/
});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
                /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
                /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
            /******/
}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
                /******/
};
            /******/
})();
/******/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                        /******/
}
                    /******/
}
                /******/
};
            /******/
})();
/******/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function () {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
                    /******/
} catch (e) {
/******/ 				if (typeof window === 'object') return window;
                    /******/
}
                /******/
})();
            /******/
})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
            /******/
})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
                    /******/
}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
                /******/
};
            /******/
})();
        /******/
        /************************************************************************/
        var __webpack_exports__ = {};
        // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
        (() => {
            /*!*********************!*\
              !*** ./src/grid.ts ***!
              \*********************/
            __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   materials: () => (/* reexport module object */ _lts_materials_legacy_legacy_grid__WEBPACK_IMPORTED_MODULE_0__)
                /* harmony export */
});
/* harmony import */ var _lts_materials_legacy_legacy_grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lts/materials/legacy/legacy-grid */ "../../../lts/materials/src/legacy/legacy-grid.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lts_materials_legacy_legacy_grid__WEBPACK_IMPORTED_MODULE_0__);

        })();

        __webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
        /******/
})()
        ;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFieWxvbi5ncmlkTWF0ZXJpYWwuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQTREQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFxQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUVBO0FBQ0E7QUFDQTtBQVNBO0FBQUE7QUFlQTtBQUFBO0FBZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTs7QUFDQTtBQUNBO0FBQUE7QUFFQTs7O0FBR0E7QUFDQTtBQUFBO0FBdUVBOzs7O0FBSUE7QUFDQTtBQUFBO0FBM0VBOztBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUVBO0FBRUE7O0FBRUE7QUFFQTtBQUVBOztBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUVBO0FBRUE7O0FBRUE7QUFFQTtBQUVBOztBQUVBO0FBRUE7QUFFQTs7QUFFQTtBQUVBO0FBRUE7O0FBRUE7QUFFQTtBQUVBOztBQUVBO0FBRUE7QUFVQTs7QUFTQTtBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQWhTQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFNQTtBQURBO0FBQ0E7QUFHQTtBQURBO0FBQ0E7QUFLQTtBQURBO0FBQ0E7QUFtT0E7QUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FDN1ZBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7OztBQ2RBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDUEE7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi9kZXYvbWF0ZXJpYWxzL3NyYy9ncmlkL2dyaWQuZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL2dyaWQvZ3JpZC52ZXJ0ZXgudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uL2Rldi9tYXRlcmlhbHMvc3JjL2dyaWQvZ3JpZE1hdGVyaWFsLnRzIiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi9kZXYvbWF0ZXJpYWxzL3NyYy9ncmlkL2luZGV4LnRzIiwid2VicGFjazovL01BVEVSSUFMUy8uLi8uLi8uLi9sdHMvbWF0ZXJpYWxzL3NyYy9sZWdhY3kvbGVnYWN5LWdyaWQudHMiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL2V4dGVybmFsIHVtZCB7XCJyb290XCI6XCJCQUJZTE9OXCIsXCJjb21tb25qc1wiOlwiYmFieWxvbmpzXCIsXCJjb21tb25qczJcIjpcImJhYnlsb25qc1wiLFwiYW1kXCI6XCJiYWJ5bG9uanNcIn0iLCJ3ZWJwYWNrOi8vTUFURVJJQUxTLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYubWpzIiwid2VicGFjazovL01BVEVSSUFMUy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vTUFURVJJQUxTL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9NQVRFUklBTFMvLi9zcmMvZ3JpZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJiYWJ5bG9uanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJiYWJ5bG9uanMtbWF0ZXJpYWxzXCIsIFtcImJhYnlsb25qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJiYWJ5bG9uanMtbWF0ZXJpYWxzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYmFieWxvbmpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJNQVRFUklBTFNcIl0gPSBmYWN0b3J5KHJvb3RbXCJCQUJZTE9OXCJdKTtcbn0pKCh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdGhpcyksIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2JhYnlsb25qc19NYXRlcmlhbHNfZWZmZWN0X18pID0+IHtcbnJldHVybiAiLCIvLyBEbyBub3QgZWRpdC5cbmltcG9ydCB7IFNoYWRlclN0b3JlIH0gZnJvbSBcImNvcmUvRW5naW5lcy9zaGFkZXJTdG9yZVwiO1xuaW1wb3J0IFwiY29yZS9TaGFkZXJzL1NoYWRlcnNJbmNsdWRlL2xvZ0RlcHRoRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9mb2dGcmFnbWVudERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvZm9nRnJhZ21lbnRcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9sb2dEZXB0aEZyYWdtZW50XCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvaW1hZ2VQcm9jZXNzaW5nQ29tcGF0aWJpbGl0eVwiO1xuXG5jb25zdCBuYW1lID0gXCJncmlkUGl4ZWxTaGFkZXJcIjtcbmNvbnN0IHNoYWRlciA9IGAjZXh0ZW5zaW9uIEdMX09FU19zdGFuZGFyZF9kZXJpdmF0aXZlcyA6IGVuYWJsZVxuI2RlZmluZSBTUVJUMiAxLjQxNDIxMzU2XG4jZGVmaW5lIFBJIDMuMTQxNTlcbnByZWNpc2lvbiBoaWdocCBmbG9hdDt1bmlmb3JtIGZsb2F0IHZpc2liaWxpdHk7dW5pZm9ybSB2ZWMzIG1haW5Db2xvcjt1bmlmb3JtIHZlYzMgbGluZUNvbG9yO3VuaWZvcm0gdmVjNCBncmlkQ29udHJvbDt1bmlmb3JtIHZlYzMgZ3JpZE9mZnNldDt2YXJ5aW5nIHZlYzMgdlBvc2l0aW9uO3ZhcnlpbmcgdmVjMyB2Tm9ybWFsO1xuI2lmZGVmIExPR0FSSVRITUlDREVQVEhcbiNleHRlbnNpb24gR0xfRVhUX2ZyYWdfZGVwdGggOiBlbmFibGVcbiNlbmRpZlxuI2luY2x1ZGU8bG9nRGVwdGhEZWNsYXJhdGlvbj5cbiNpbmNsdWRlPGZvZ0ZyYWdtZW50RGVjbGFyYXRpb24+XG4jaWZkZWYgT1BBQ0lUWVxudmFyeWluZyB2ZWMyIHZPcGFjaXR5VVY7dW5pZm9ybSBzYW1wbGVyMkQgb3BhY2l0eVNhbXBsZXI7dW5pZm9ybSB2ZWMyIHZPcGFjaXR5SW5mb3M7XG4jZW5kaWZcbmZsb2F0IGdldER5bmFtaWNWaXNpYmlsaXR5KGZsb2F0IHBvc2l0aW9uKSB7ZmxvYXQgbWFqb3JHcmlkRnJlcXVlbmN5PWdyaWRDb250cm9sLnk7aWYgKGZsb29yKHBvc2l0aW9uKzAuNSk9PWZsb29yKHBvc2l0aW9uL21ham9yR3JpZEZyZXF1ZW5jeSswLjUpKm1ham9yR3JpZEZyZXF1ZW5jeSlcbntyZXR1cm4gMS4wO31cbnJldHVybiBncmlkQ29udHJvbC56O31cbmZsb2F0IGdldEFuaXNvdHJvcGljQXR0ZW51YXRpb24oZmxvYXQgZGlmZmVyZW50aWFsTGVuZ3RoKSB7Y29uc3QgZmxvYXQgbWF4TnVtYmVyT2ZMaW5lcz0xMC4wO3JldHVybiBjbGFtcCgxLjAvKGRpZmZlcmVudGlhbExlbmd0aCsxLjApLTEuMC9tYXhOdW1iZXJPZkxpbmVzLDAuMCwxLjApO31cbmZsb2F0IGlzUG9pbnRPbkxpbmUoZmxvYXQgcG9zaXRpb24sZmxvYXQgZGlmZmVyZW50aWFsTGVuZ3RoKSB7ZmxvYXQgZnJhY3Rpb25QYXJ0T2ZQb3NpdGlvbj1wb3NpdGlvbi1mbG9vcihwb3NpdGlvbiswLjUpOyBcbmZyYWN0aW9uUGFydE9mUG9zaXRpb24vPWRpZmZlcmVudGlhbExlbmd0aDsgXG4jaWZkZWYgQU5USUFMSUFTXG5mcmFjdGlvblBhcnRPZlBvc2l0aW9uPWNsYW1wKGZyYWN0aW9uUGFydE9mUG9zaXRpb24sLTEuLDEuKTtmbG9hdCByZXN1bHQ9MC41KzAuNSpjb3MoZnJhY3Rpb25QYXJ0T2ZQb3NpdGlvbipQSSk7IFxucmV0dXJuIHJlc3VsdDtcbiNlbHNlXG5yZXR1cm4gYWJzKGZyYWN0aW9uUGFydE9mUG9zaXRpb24pPFNRUlQyLzQuID8gMS4gOiAwLjtcbiNlbmRpZlxufVxuZmxvYXQgY29udHJpYnV0aW9uT25BeGlzKGZsb2F0IHBvc2l0aW9uKSB7ZmxvYXQgZGlmZmVyZW50aWFsTGVuZ3RoPWxlbmd0aCh2ZWMyKGRGZHgocG9zaXRpb24pLGRGZHkocG9zaXRpb24pKSk7ZGlmZmVyZW50aWFsTGVuZ3RoKj1TUVJUMjsgXG5mbG9hdCByZXN1bHQ9aXNQb2ludE9uTGluZShwb3NpdGlvbixkaWZmZXJlbnRpYWxMZW5ndGgpO2Zsb2F0IGR5bmFtaWNWaXNpYmlsaXR5PWdldER5bmFtaWNWaXNpYmlsaXR5KHBvc2l0aW9uKTtyZXN1bHQqPWR5bmFtaWNWaXNpYmlsaXR5O2Zsb2F0IGFuaXNvdHJvcGljQXR0ZW51YXRpb249Z2V0QW5pc290cm9waWNBdHRlbnVhdGlvbihkaWZmZXJlbnRpYWxMZW5ndGgpO3Jlc3VsdCo9YW5pc290cm9waWNBdHRlbnVhdGlvbjtyZXR1cm4gcmVzdWx0O31cbmZsb2F0IG5vcm1hbEltcGFjdE9uQXhpcyhmbG9hdCB4KSB7ZmxvYXQgbm9ybWFsSW1wYWN0PWNsYW1wKDEuMC0zLjAqYWJzKHgqeCp4KSwwLjAsMS4wKTtyZXR1cm4gbm9ybWFsSW1wYWN0O31cbiNkZWZpbmUgQ1VTVE9NX0ZSQUdNRU5UX0RFRklOSVRJT05TXG52b2lkIG1haW4odm9pZCkge1xuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9CRUdJTlxuZmxvYXQgZ3JpZFJhdGlvPWdyaWRDb250cm9sLng7dmVjMyBncmlkUG9zPSh2UG9zaXRpb24rZ3JpZE9mZnNldC54eXopL2dyaWRSYXRpbztmbG9hdCB4PWNvbnRyaWJ1dGlvbk9uQXhpcyhncmlkUG9zLngpO2Zsb2F0IHk9Y29udHJpYnV0aW9uT25BeGlzKGdyaWRQb3MueSk7ZmxvYXQgej1jb250cmlidXRpb25PbkF4aXMoZ3JpZFBvcy56KTt2ZWMzIG5vcm1hbD1ub3JtYWxpemUodk5vcm1hbCk7eCo9bm9ybWFsSW1wYWN0T25BeGlzKG5vcm1hbC54KTt5Kj1ub3JtYWxJbXBhY3RPbkF4aXMobm9ybWFsLnkpO3oqPW5vcm1hbEltcGFjdE9uQXhpcyhub3JtYWwueik7XG4jaWZkZWYgTUFYX0xJTkVcbmZsb2F0IGdyaWQ9Y2xhbXAobWF4KG1heCh4LHkpLHopLDAuLDEuKTtcbiNlbHNlXG5mbG9hdCBncmlkPWNsYW1wKHgreSt6LDAuLDEuKTtcbiNlbmRpZlxudmVjMyBjb2xvcj1taXgobWFpbkNvbG9yLGxpbmVDb2xvcixncmlkKTtcbiNpZmRlZiBGT0dcbiNpbmNsdWRlPGZvZ0ZyYWdtZW50PlxuI2VuZGlmXG5mbG9hdCBvcGFjaXR5PTEuMDtcbiNpZmRlZiBUUkFOU1BBUkVOVFxub3BhY2l0eT1jbGFtcChncmlkLDAuMDgsZ3JpZENvbnRyb2wudypncmlkKTtcbiNlbmRpZlxuI2lmZGVmIE9QQUNJVFlcbm9wYWNpdHkqPXRleHR1cmUyRChvcGFjaXR5U2FtcGxlcix2T3BhY2l0eVVWKS5hO1xuI2VuZGlmXG5nbF9GcmFnQ29sb3I9dmVjNChjb2xvci5yZ2Isb3BhY2l0eSp2aXNpYmlsaXR5KTtcbiNpZmRlZiBUUkFOU1BBUkVOVFxuI2lmZGVmIFBSRU1VTFRJUExZQUxQSEFcbmdsX0ZyYWdDb2xvci5yZ2IqPW9wYWNpdHk7XG4jZW5kaWZcbiNlbHNlXG4jZW5kaWZcbiNpbmNsdWRlPGxvZ0RlcHRoRnJhZ21lbnQ+XG4jaW5jbHVkZTxpbWFnZVByb2Nlc3NpbmdDb21wYXRpYmlsaXR5PlxuI2RlZmluZSBDVVNUT01fRlJBR01FTlRfTUFJTl9FTkRcbn1cbmA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgZ3JpZFBpeGVsU2hhZGVyID0geyBuYW1lLCBzaGFkZXIgfTtcbiIsIi8vIERvIG5vdCBlZGl0LlxuaW1wb3J0IHsgU2hhZGVyU3RvcmUgfSBmcm9tIFwiY29yZS9FbmdpbmVzL3NoYWRlclN0b3JlXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvaW5zdGFuY2VzRGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9sb2dEZXB0aERlY2xhcmF0aW9uXCI7XG5pbXBvcnQgXCJjb3JlL1NoYWRlcnMvU2hhZGVyc0luY2x1ZGUvZm9nVmVydGV4RGVjbGFyYXRpb25cIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9pbnN0YW5jZXNWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9mb2dWZXJ0ZXhcIjtcbmltcG9ydCBcImNvcmUvU2hhZGVycy9TaGFkZXJzSW5jbHVkZS9sb2dEZXB0aFZlcnRleFwiO1xuXG5jb25zdCBuYW1lID0gXCJncmlkVmVydGV4U2hhZGVyXCI7XG5jb25zdCBzaGFkZXIgPSBgcHJlY2lzaW9uIGhpZ2hwIGZsb2F0O2F0dHJpYnV0ZSB2ZWMzIHBvc2l0aW9uO2F0dHJpYnV0ZSB2ZWMzIG5vcm1hbDtcbiNpZmRlZiBVVjFcbmF0dHJpYnV0ZSB2ZWMyIHV2O1xuI2VuZGlmXG4jaWZkZWYgVVYyXG5hdHRyaWJ1dGUgdmVjMiB1djI7XG4jZW5kaWZcbiNpbmNsdWRlPGluc3RhbmNlc0RlY2xhcmF0aW9uPlxudW5pZm9ybSBtYXQ0IHByb2plY3Rpb247dW5pZm9ybSBtYXQ0IHZpZXc7dmFyeWluZyB2ZWMzIHZQb3NpdGlvbjt2YXJ5aW5nIHZlYzMgdk5vcm1hbDtcbiNpbmNsdWRlPGxvZ0RlcHRoRGVjbGFyYXRpb24+XG4jaW5jbHVkZTxmb2dWZXJ0ZXhEZWNsYXJhdGlvbj5cbiNpZmRlZiBPUEFDSVRZXG52YXJ5aW5nIHZlYzIgdk9wYWNpdHlVVjt1bmlmb3JtIG1hdDQgb3BhY2l0eU1hdHJpeDt1bmlmb3JtIHZlYzIgdk9wYWNpdHlJbmZvcztcbiNlbmRpZlxuI2RlZmluZSBDVVNUT01fVkVSVEVYX0RFRklOSVRJT05TXG52b2lkIG1haW4odm9pZCkge1xuI2RlZmluZSBDVVNUT01fVkVSVEVYX01BSU5fQkVHSU5cbiNpbmNsdWRlPGluc3RhbmNlc1ZlcnRleD5cbnZlYzQgd29ybGRQb3M9ZmluYWxXb3JsZCp2ZWM0KHBvc2l0aW9uLDEuMCk7XG4jaW5jbHVkZTxmb2dWZXJ0ZXg+XG52ZWM0IGNhbWVyYVNwYWNlUG9zaXRpb249dmlldyp3b3JsZFBvcztnbF9Qb3NpdGlvbj1wcm9qZWN0aW9uKmNhbWVyYVNwYWNlUG9zaXRpb247XG4jaWZkZWYgT1BBQ0lUWVxuI2lmbmRlZiBVVjFcbnZlYzIgdXY9dmVjMigwLiwwLik7XG4jZW5kaWZcbiNpZm5kZWYgVVYyXG52ZWMyIHV2Mj12ZWMyKDAuLDAuKTtcbiNlbmRpZlxuaWYgKHZPcGFjaXR5SW5mb3MueD09MC4pXG57dk9wYWNpdHlVVj12ZWMyKG9wYWNpdHlNYXRyaXgqdmVjNCh1diwxLjAsMC4wKSk7fVxuZWxzZVxue3ZPcGFjaXR5VVY9dmVjMihvcGFjaXR5TWF0cml4KnZlYzQodXYyLDEuMCwwLjApKTt9XG4jZW5kaWYgXG4jaW5jbHVkZTxsb2dEZXB0aFZlcnRleD5cbnZQb3NpdGlvbj1wb3NpdGlvbjt2Tm9ybWFsPW5vcm1hbDtcbiNkZWZpbmUgQ1VTVE9NX1ZFUlRFWF9NQUlOX0VORFxufWA7XG4vLyBTaWRlZWZmZWN0XG5TaGFkZXJTdG9yZS5TaGFkZXJzU3RvcmVbbmFtZV0gPSBzaGFkZXI7XG4vKiogQGludGVybmFsICovXG5leHBvcnQgY29uc3QgZ3JpZFZlcnRleFNoYWRlciA9IHsgbmFtZSwgc2hhZGVyIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbmFtaW5nLWNvbnZlbnRpb24gKi9cclxuaW1wb3J0IHsgc2VyaWFsaXplQXNUZXh0dXJlLCBzZXJpYWxpemUsIGV4cGFuZFRvUHJvcGVydHksIHNlcmlhbGl6ZUFzQ29sb3IzLCBzZXJpYWxpemVBc1ZlY3RvcjMgfSBmcm9tIFwiY29yZS9NaXNjL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHsgU2VyaWFsaXphdGlvbkhlbHBlciB9IGZyb20gXCJjb3JlL01pc2MvZGVjb3JhdG9ycy5zZXJpYWxpemF0aW9uXCI7XHJcbmltcG9ydCB0eXBlIHsgTWF0cml4IH0gZnJvbSBcImNvcmUvTWF0aHMvbWF0aC52ZWN0b3JcIjtcclxuaW1wb3J0IHsgVmVjdG9yNCwgVmVjdG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGgudmVjdG9yXCI7XHJcbmltcG9ydCB7IENvbG9yMyB9IGZyb20gXCJjb3JlL01hdGhzL21hdGguY29sb3JcIjtcclxuaW1wb3J0IHR5cGUgeyBCYXNlVGV4dHVyZSB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9UZXh0dXJlcy9iYXNlVGV4dHVyZVwiO1xyXG5pbXBvcnQgeyBNYXRlcmlhbERlZmluZXMgfSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxEZWZpbmVzXCI7XHJcbmltcG9ydCB7IFB1c2hNYXRlcmlhbCB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9wdXNoTWF0ZXJpYWxcIjtcclxuaW1wb3J0IHsgTWF0ZXJpYWxGbGFncyB9IGZyb20gXCJjb3JlL01hdGVyaWFscy9tYXRlcmlhbEZsYWdzXCI7XHJcbmltcG9ydCB7IFZlcnRleEJ1ZmZlciB9IGZyb20gXCJjb3JlL0J1ZmZlcnMvYnVmZmVyXCI7XHJcbmltcG9ydCB0eXBlIHsgQWJzdHJhY3RNZXNoIH0gZnJvbSBcImNvcmUvTWVzaGVzL2Fic3RyYWN0TWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IFN1Yk1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvc3ViTWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1lc2ggfSBmcm9tIFwiY29yZS9NZXNoZXMvbWVzaFwiO1xyXG5pbXBvcnQgdHlwZSB7IFNjZW5lIH0gZnJvbSBcImNvcmUvc2NlbmVcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDbGFzcyB9IGZyb20gXCJjb3JlL01pc2MvdHlwZVN0b3JlXCI7XHJcblxyXG5pbXBvcnQgXCIuL2dyaWQuZnJhZ21lbnRcIjtcclxuaW1wb3J0IFwiLi9ncmlkLnZlcnRleFwiO1xyXG5pbXBvcnQge1xyXG4gICAgQmluZEZvZ1BhcmFtZXRlcnMsXHJcbiAgICBCaW5kTG9nRGVwdGgsXHJcbiAgICBQcmVwYXJlQXR0cmlidXRlc0Zvckluc3RhbmNlcyxcclxuICAgIFByZXBhcmVEZWZpbmVzRm9yQXR0cmlidXRlcyxcclxuICAgIFByZXBhcmVEZWZpbmVzRm9yRnJhbWVCb3VuZFZhbHVlcyxcclxuICAgIFByZXBhcmVEZWZpbmVzRm9yTWlzYyxcclxufSBmcm9tIFwiY29yZS9NYXRlcmlhbHMvbWF0ZXJpYWxIZWxwZXIuZnVuY3Rpb25zXCI7XHJcblxyXG5jbGFzcyBHcmlkTWF0ZXJpYWxEZWZpbmVzIGV4dGVuZHMgTWF0ZXJpYWxEZWZpbmVzIHtcclxuICAgIHB1YmxpYyBPUEFDSVRZID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgQU5USUFMSUFTID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgVFJBTlNQQVJFTlQgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBGT0cgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQUkVNVUxUSVBMWUFMUEhBID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgTUFYX0xJTkUgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBVVjEgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBVVjIgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBJTlNUQU5DRVMgPSBmYWxzZTtcclxuICAgIHB1YmxpYyBUSElOX0lOU1RBTkNFUyA9IGZhbHNlO1xyXG4gICAgcHVibGljIElNQUdFUFJPQ0VTU0lOR1BPU1RQUk9DRVNTID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgU0tJUEZJTkFMQ09MT1JDTEFNUCA9IGZhbHNlO1xyXG4gICAgcHVibGljIExPR0FSSVRITUlDREVQVEggPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMucmVidWlsZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIGdyaWQgbWF0ZXJpYWxzIGFsbG93cyB5b3UgdG8gd3JhcCBhbnkgc2hhcGUgd2l0aCBhIGdyaWQuXHJcbiAqIENvbG9ycyBhcmUgY3VzdG9taXphYmxlLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdyaWRNYXRlcmlhbCBleHRlbmRzIFB1c2hNYXRlcmlhbCB7XHJcbiAgICAvKipcclxuICAgICAqIE1haW4gY29sb3Igb2YgdGhlIGdyaWQgKGUuZy4gYmV0d2VlbiBsaW5lcylcclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZUFzQ29sb3IzKClcclxuICAgIHB1YmxpYyBtYWluQ29sb3IgPSBDb2xvcjMuQmxhY2soKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbG9yIG9mIHRoZSBncmlkIGxpbmVzLlxyXG4gICAgICovXHJcbiAgICBAc2VyaWFsaXplQXNDb2xvcjMoKVxyXG4gICAgcHVibGljIGxpbmVDb2xvciA9IENvbG9yMy5UZWFsKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2NhbGUgb2YgdGhlIGdyaWQgY29tcGFyZWQgdG8gdW5pdC5cclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgZ3JpZFJhdGlvID0gMS4wO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWxsb3dzIHNldHRpbmcgYW4gb2Zmc2V0IGZvciB0aGUgZ3JpZCBsaW5lcy5cclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZUFzVmVjdG9yMygpXHJcbiAgICBwdWJsaWMgZ3JpZE9mZnNldCA9IFZlY3RvcjMuWmVybygpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGZyZXF1ZW5jeSBvZiB0aGlja2VyIGxpbmVzLlxyXG4gICAgICovXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBtYWpvclVuaXRGcmVxdWVuY3kgPSAxMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSB2aXNpYmlsaXR5IG9mIG1pbm9yIHVuaXRzIGluIHRoZSBncmlkLlxyXG4gICAgICovXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBtaW5vclVuaXRWaXNpYmlsaXR5ID0gMC4zMztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBncmlkIG9wYWNpdHkgb3V0c2lkZSBvZiB0aGUgbGluZXMuXHJcbiAgICAgKi9cclxuICAgIEBzZXJpYWxpemUoKVxyXG4gICAgcHVibGljIG9wYWNpdHkgPSAxLjA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXaGV0aGVyIHRvIGFudGlhbGlhcyB0aGUgZ3JpZFxyXG4gICAgICovXHJcbiAgICBAc2VyaWFsaXplKClcclxuICAgIHB1YmxpYyBhbnRpYWxpYXMgPSB0cnVlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lIFJCRyBvdXRwdXQgaXMgcHJlbXVsdGlwbGllZCBieSBhbHBoYSB2YWx1ZS5cclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgcHJlTXVsdGlwbHlBbHBoYSA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0ZXJtaW5lcyBpZiB0aGUgbWF4IGxpbmUgdmFsdWUgd2lsbCBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIHN1bSB3aGVyZXZlciBncmlkIGxpbmVzIGludGVyc2VjdC5cclxuICAgICAqL1xyXG4gICAgQHNlcmlhbGl6ZSgpXHJcbiAgICBwdWJsaWMgdXNlTWF4TGluZSA9IGZhbHNlO1xyXG5cclxuICAgIEBzZXJpYWxpemVBc1RleHR1cmUoXCJvcGFjaXR5VGV4dHVyZVwiKVxyXG4gICAgcHJpdmF0ZSBfb3BhY2l0eVRleHR1cmU6IEJhc2VUZXh0dXJlO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUZXh0dXJlIHRvIGRlZmluZSBvcGFjaXR5IG9mIHRoZSBncmlkXHJcbiAgICAgKi9cclxuICAgIEBleHBhbmRUb1Byb3BlcnR5KFwiX21hcmtBbGxTdWJNZXNoZXNBc1RleHR1cmVzRGlydHlcIilcclxuICAgIHB1YmxpYyBvcGFjaXR5VGV4dHVyZTogQmFzZVRleHR1cmU7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ3JpZENvbnRyb2w6IFZlY3RvcjQgPSBuZXcgVmVjdG9yNCh0aGlzLmdyaWRSYXRpbywgdGhpcy5tYWpvclVuaXRGcmVxdWVuY3ksIHRoaXMubWlub3JVbml0VmlzaWJpbGl0eSwgdGhpcy5vcGFjaXR5KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBnaXZlbiB0byB0aGUgbWF0ZXJpYWwgaW4gb3JkZXIgdG8gaWRlbnRpZnkgaXQgYWZ0ZXJ3YXJkcy5cclxuICAgICAqIEBwYXJhbSBzY2VuZSBUaGUgc2NlbmUgdGhlIG1hdGVyaWFsIGlzIHVzZWQgaW4uXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgc2NlbmU/OiBTY2VuZSkge1xyXG4gICAgICAgIHN1cGVyKG5hbWUsIHNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEByZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBncmlkIHJlcXVpcmVzIGFscGhhIGJsZW5kaW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgbmVlZEFscGhhQmxlbmRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMub3BhY2l0eSA8IDEuMCB8fCAodGhpcy5fb3BhY2l0eVRleHR1cmUgJiYgdGhpcy5fb3BhY2l0eVRleHR1cmUuaXNSZWFkeSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgbmVlZEFscGhhQmxlbmRpbmdGb3JNZXNoKG1lc2g6IEFic3RyYWN0TWVzaCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBtZXNoLnZpc2liaWxpdHkgPCAxLjAgfHwgdGhpcy5uZWVkQWxwaGFCbGVuZGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvdmVycmlkZSBpc1JlYWR5Rm9yU3ViTWVzaChtZXNoOiBBYnN0cmFjdE1lc2gsIHN1Yk1lc2g6IFN1Yk1lc2gsIHVzZUluc3RhbmNlcz86IGJvb2xlYW4pOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCBkcmF3V3JhcHBlciA9IHN1Yk1lc2guX2RyYXdXcmFwcGVyO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0Zyb3plbikge1xyXG4gICAgICAgICAgICBpZiAoZHJhd1dyYXBwZXIuZWZmZWN0ICYmIGRyYXdXcmFwcGVyLl93YXNQcmV2aW91c2x5UmVhZHkgJiYgZHJhd1dyYXBwZXIuX3dhc1ByZXZpb3VzbHlVc2luZ0luc3RhbmNlcyA9PT0gdXNlSW5zdGFuY2VzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzdWJNZXNoLm1hdGVyaWFsRGVmaW5lcykge1xyXG4gICAgICAgICAgICBzdWJNZXNoLm1hdGVyaWFsRGVmaW5lcyA9IG5ldyBHcmlkTWF0ZXJpYWxEZWZpbmVzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZWZpbmVzID0gPEdyaWRNYXRlcmlhbERlZmluZXM+c3ViTWVzaC5tYXRlcmlhbERlZmluZXM7XHJcbiAgICAgICAgY29uc3Qgc2NlbmUgPSB0aGlzLmdldFNjZW5lKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pc1JlYWR5Rm9yU3ViTWVzaChzdWJNZXNoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZWZpbmVzLlRSQU5TUEFSRU5UICE9PSB0aGlzLm9wYWNpdHkgPCAxLjApIHtcclxuICAgICAgICAgICAgZGVmaW5lcy5UUkFOU1BBUkVOVCA9ICFkZWZpbmVzLlRSQU5TUEFSRU5UO1xyXG4gICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVmaW5lcy5QUkVNVUxUSVBMWUFMUEhBICE9IHRoaXMucHJlTXVsdGlwbHlBbHBoYSkge1xyXG4gICAgICAgICAgICBkZWZpbmVzLlBSRU1VTFRJUExZQUxQSEEgPSAhZGVmaW5lcy5QUkVNVUxUSVBMWUFMUEhBO1xyXG4gICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1VucHJvY2Vzc2VkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVmaW5lcy5NQVhfTElORSAhPT0gdGhpcy51c2VNYXhMaW5lKSB7XHJcbiAgICAgICAgICAgIGRlZmluZXMuTUFYX0xJTkUgPSAhZGVmaW5lcy5NQVhfTElORTtcclxuICAgICAgICAgICAgZGVmaW5lcy5tYXJrQXNVbnByb2Nlc3NlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRlZmluZXMuQU5USUFMSUFTICE9PSB0aGlzLmFudGlhbGlhcykge1xyXG4gICAgICAgICAgICBkZWZpbmVzLkFOVElBTElBUyA9ICFkZWZpbmVzLkFOVElBTElBUztcclxuICAgICAgICAgICAgZGVmaW5lcy5tYXJrQXNVbnByb2Nlc3NlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGV4dHVyZXNcclxuICAgICAgICBpZiAoZGVmaW5lcy5fYXJlVGV4dHVyZXNEaXJ0eSkge1xyXG4gICAgICAgICAgICBkZWZpbmVzLl9uZWVkVVZzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChzY2VuZS50ZXh0dXJlc0VuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcGFjaXR5VGV4dHVyZSAmJiBNYXRlcmlhbEZsYWdzLk9wYWNpdHlUZXh0dXJlRW5hYmxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fb3BhY2l0eVRleHR1cmUuaXNSZWFkeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbmVzLl9uZWVkVVZzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5lcy5PUEFDSVRZID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFByZXBhcmVEZWZpbmVzRm9yTWlzYyhtZXNoLCBzY2VuZSwgdGhpcy5fdXNlTG9nYXJpdGhtaWNEZXB0aCwgZmFsc2UsIHRoaXMuZm9nRW5hYmxlZCwgZmFsc2UsIGRlZmluZXMpO1xyXG5cclxuICAgICAgICAvLyBWYWx1ZXMgdGhhdCBuZWVkIHRvIGJlIGV2YWx1YXRlZCBvbiBldmVyeSBmcmFtZVxyXG4gICAgICAgIFByZXBhcmVEZWZpbmVzRm9yRnJhbWVCb3VuZFZhbHVlcyhzY2VuZSwgc2NlbmUuZ2V0RW5naW5lKCksIHRoaXMsIGRlZmluZXMsICEhdXNlSW5zdGFuY2VzKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IGNvcnJlY3QgZWZmZWN0XHJcbiAgICAgICAgaWYgKGRlZmluZXMuaXNEaXJ0eSkge1xyXG4gICAgICAgICAgICBkZWZpbmVzLm1hcmtBc1Byb2Nlc3NlZCgpO1xyXG4gICAgICAgICAgICBzY2VuZS5yZXNldENhY2hlZE1hdGVyaWFsKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIFByZXBhcmVEZWZpbmVzRm9yQXR0cmlidXRlcyhtZXNoLCBkZWZpbmVzLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJzID0gW1ZlcnRleEJ1ZmZlci5Qb3NpdGlvbktpbmQsIFZlcnRleEJ1ZmZlci5Ob3JtYWxLaW5kXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLlVWMSkge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlicy5wdXNoKFZlcnRleEJ1ZmZlci5VVktpbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZWZpbmVzLlVWMikge1xyXG4gICAgICAgICAgICAgICAgYXR0cmlicy5wdXNoKFZlcnRleEJ1ZmZlci5VVjJLaW5kKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVmaW5lcy5JTUFHRVBST0NFU1NJTkdQT1NUUFJPQ0VTUyA9IHNjZW5lLmltYWdlUHJvY2Vzc2luZ0NvbmZpZ3VyYXRpb24uYXBwbHlCeVBvc3RQcm9jZXNzO1xyXG5cclxuICAgICAgICAgICAgUHJlcGFyZUF0dHJpYnV0ZXNGb3JJbnN0YW5jZXMoYXR0cmlicywgZGVmaW5lcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBEZWZpbmVzXHJcbiAgICAgICAgICAgIGNvbnN0IGpvaW4gPSBkZWZpbmVzLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHN1Yk1lc2guc2V0RWZmZWN0KFxyXG4gICAgICAgICAgICAgICAgc2NlbmVcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RW5naW5lKClcclxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRWZmZWN0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cmlicyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJwcm9qZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm1haW5Db2xvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5lQ29sb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JpZENvbnRyb2xcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3JpZE9mZnNldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2Rm9nSW5mb3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidkZvZ0NvbG9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndvcmxkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3BhY2l0eU1hdHJpeFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ2T3BhY2l0eUluZm9zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibG9nYXJpdGhtaWNEZXB0aENvbnN0YW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcIm9wYWNpdHlTYW1wbGVyXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqb2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21waWxlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGRlZmluZXMsXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXRlcmlhbENvbnRleHRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc3ViTWVzaC5lZmZlY3QgfHwgIXN1Yk1lc2guZWZmZWN0LmlzUmVhZHkoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZWZpbmVzLl9yZW5kZXJJZCA9IHNjZW5lLmdldFJlbmRlcklkKCk7XHJcbiAgICAgICAgZHJhd1dyYXBwZXIuX3dhc1ByZXZpb3VzbHlSZWFkeSA9IHRydWU7XHJcbiAgICAgICAgZHJhd1dyYXBwZXIuX3dhc1ByZXZpb3VzbHlVc2luZ0luc3RhbmNlcyA9ICEhdXNlSW5zdGFuY2VzO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgYmluZEZvclN1Yk1lc2god29ybGQ6IE1hdHJpeCwgbWVzaDogTWVzaCwgc3ViTWVzaDogU3ViTWVzaCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNjZW5lID0gdGhpcy5nZXRTY2VuZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBkZWZpbmVzID0gPEdyaWRNYXRlcmlhbERlZmluZXM+c3ViTWVzaC5tYXRlcmlhbERlZmluZXM7XHJcbiAgICAgICAgaWYgKCFkZWZpbmVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGVmZmVjdCA9IHN1Yk1lc2guZWZmZWN0O1xyXG4gICAgICAgIGlmICghZWZmZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0ID0gZWZmZWN0O1xyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0RmxvYXQoXCJ2aXNpYmlsaXR5XCIsIG1lc2gudmlzaWJpbGl0eSk7XHJcblxyXG4gICAgICAgIC8vIE1hdHJpY2VzXHJcbiAgICAgICAgaWYgKCFkZWZpbmVzLklOU1RBTkNFUyB8fCBkZWZpbmVzLlRISU5fSU5TVEFOQ0UpIHtcclxuICAgICAgICAgICAgdGhpcy5iaW5kT25seVdvcmxkTWF0cml4KHdvcmxkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlRWZmZWN0LnNldE1hdHJpeChcInZpZXdcIiwgc2NlbmUuZ2V0Vmlld01hdHJpeCgpKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0TWF0cml4KFwicHJvamVjdGlvblwiLCBzY2VuZS5nZXRQcm9qZWN0aW9uTWF0cml4KCkpO1xyXG5cclxuICAgICAgICAvLyBVbmlmb3Jtc1xyXG4gICAgICAgIGlmICh0aGlzLl9tdXN0UmViaW5kKHNjZW5lLCBlZmZlY3QsIHN1Yk1lc2gpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRDb2xvcjMoXCJtYWluQ29sb3JcIiwgdGhpcy5tYWluQ29sb3IpO1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0Q29sb3IzKFwibGluZUNvbG9yXCIsIHRoaXMubGluZUNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRWZWN0b3IzKFwiZ3JpZE9mZnNldFwiLCB0aGlzLmdyaWRPZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZ3JpZENvbnRyb2wueCA9IHRoaXMuZ3JpZFJhdGlvO1xyXG4gICAgICAgICAgICB0aGlzLl9ncmlkQ29udHJvbC55ID0gTWF0aC5yb3VuZCh0aGlzLm1ham9yVW5pdEZyZXF1ZW5jeSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2dyaWRDb250cm9sLnogPSB0aGlzLm1pbm9yVW5pdFZpc2liaWxpdHk7XHJcbiAgICAgICAgICAgIHRoaXMuX2dyaWRDb250cm9sLncgPSB0aGlzLm9wYWNpdHk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRWZWN0b3I0KFwiZ3JpZENvbnRyb2xcIiwgdGhpcy5fZ3JpZENvbnRyb2wpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX29wYWNpdHlUZXh0dXJlICYmIE1hdGVyaWFsRmxhZ3MuT3BhY2l0eVRleHR1cmVFbmFibGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmVFZmZlY3Quc2V0VGV4dHVyZShcIm9wYWNpdHlTYW1wbGVyXCIsIHRoaXMuX29wYWNpdHlUZXh0dXJlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRGbG9hdDIoXCJ2T3BhY2l0eUluZm9zXCIsIHRoaXMuX29wYWNpdHlUZXh0dXJlLmNvb3JkaW5hdGVzSW5kZXgsIHRoaXMuX29wYWNpdHlUZXh0dXJlLmxldmVsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUVmZmVjdC5zZXRNYXRyaXgoXCJvcGFjaXR5TWF0cml4XCIsIHRoaXMuX29wYWNpdHlUZXh0dXJlLmdldFRleHR1cmVNYXRyaXgoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIExvZy4gZGVwdGhcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3VzZUxvZ2FyaXRobWljRGVwdGgpIHtcclxuICAgICAgICAgICAgICAgIEJpbmRMb2dEZXB0aChkZWZpbmVzLCBlZmZlY3QsIHNjZW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBGb2dcclxuICAgICAgICBCaW5kRm9nUGFyYW1ldGVycyhzY2VuZSwgbWVzaCwgdGhpcy5fYWN0aXZlRWZmZWN0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fYWZ0ZXJCaW5kKG1lc2gsIHRoaXMuX2FjdGl2ZUVmZmVjdCwgc3ViTWVzaCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEaXNwb3NlIHRoZSBtYXRlcmlhbCBhbmQgaXRzIGFzc29jaWF0ZWQgcmVzb3VyY2VzLlxyXG4gICAgICogQHBhcmFtIGZvcmNlRGlzcG9zZUVmZmVjdCB3aWxsIGFsc28gZGlzcG9zZSB0aGUgdXNlZCBlZmZlY3Qgd2hlbiB0cnVlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvdmVycmlkZSBkaXNwb3NlKGZvcmNlRGlzcG9zZUVmZmVjdD86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKGZvcmNlRGlzcG9zZUVmZmVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG92ZXJyaWRlIGNsb25lKG5hbWU6IHN0cmluZyk6IEdyaWRNYXRlcmlhbCB7XHJcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6YXRpb25IZWxwZXIuQ2xvbmUoKCkgPT4gbmV3IEdyaWRNYXRlcmlhbChuYW1lLCB0aGlzLmdldFNjZW5lKCkpLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgc2VyaWFsaXplKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3Qgc2VyaWFsaXphdGlvbk9iamVjdCA9IHN1cGVyLnNlcmlhbGl6ZSgpO1xyXG4gICAgICAgIHNlcmlhbGl6YXRpb25PYmplY3QuY3VzdG9tVHlwZSA9IFwiQkFCWUxPTi5HcmlkTWF0ZXJpYWxcIjtcclxuICAgICAgICByZXR1cm4gc2VyaWFsaXphdGlvbk9iamVjdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3ZlcnJpZGUgZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiR3JpZE1hdGVyaWFsXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBvdmVycmlkZSBQYXJzZShzb3VyY2U6IGFueSwgc2NlbmU6IFNjZW5lLCByb290VXJsOiBzdHJpbmcpOiBHcmlkTWF0ZXJpYWwge1xyXG4gICAgICAgIHJldHVybiBTZXJpYWxpemF0aW9uSGVscGVyLlBhcnNlKCgpID0+IG5ldyBHcmlkTWF0ZXJpYWwoc291cmNlLm5hbWUsIHNjZW5lKSwgc291cmNlLCBzY2VuZSwgcm9vdFVybCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlZ2lzdGVyQ2xhc3MoXCJCQUJZTE9OLkdyaWRNYXRlcmlhbFwiLCBHcmlkTWF0ZXJpYWwpO1xyXG4iLCJleHBvcnQgKiBmcm9tIFwiLi9ncmlkTWF0ZXJpYWxcIjtcclxuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWludGVybmFsLW1vZHVsZXMgKi9cclxuaW1wb3J0ICogYXMgTWF0TGliIGZyb20gXCJtYXRlcmlhbHMvZ3JpZC9pbmRleFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGVudHJ5IHBvaW50IGZvciB0aGUgVU1EIG1vZHVsZS5cclxuICogVGhlIGVudHJ5IHBvaW50IGZvciBhIGZ1dHVyZSBFU00gcGFja2FnZSBzaG91bGQgYmUgaW5kZXgudHNcclxuICovXHJcbmNvbnN0IGdsb2JhbE9iamVjdCA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdW5kZWZpbmVkO1xyXG5pZiAodHlwZW9mIGdsb2JhbE9iamVjdCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gTWF0TGliKSB7XHJcbiAgICAgICAgKDxhbnk+Z2xvYmFsT2JqZWN0KS5CQUJZTE9OW2tleV0gPSAoPGFueT5NYXRMaWIpW2tleV07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCAqIGZyb20gXCJtYXRlcmlhbHMvZ3JpZC9pbmRleFwiO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfYmFieWxvbmpzX01hdGVyaWFsc19lZmZlY3RfXzsiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cblxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXG5cbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xuICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xuICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufVxuXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XG4gIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XG4gICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdDtcbiAgfVxuICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XG4gIHZhciB0ID0ge307XG4gIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxuICAgICAgdFtwXSA9IHNbcF07XG4gIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xuICAgICAgfVxuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcbiAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcbiAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19lc0RlY29yYXRlKGN0b3IsIGRlc2NyaXB0b3JJbiwgZGVjb3JhdG9ycywgY29udGV4dEluLCBpbml0aWFsaXplcnMsIGV4dHJhSW5pdGlhbGl6ZXJzKSB7XG4gIGZ1bmN0aW9uIGFjY2VwdChmKSB7IGlmIChmICE9PSB2b2lkIDAgJiYgdHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uIGV4cGVjdGVkXCIpOyByZXR1cm4gZjsgfVxuICB2YXIga2luZCA9IGNvbnRleHRJbi5raW5kLCBrZXkgPSBraW5kID09PSBcImdldHRlclwiID8gXCJnZXRcIiA6IGtpbmQgPT09IFwic2V0dGVyXCIgPyBcInNldFwiIDogXCJ2YWx1ZVwiO1xuICB2YXIgdGFyZ2V0ID0gIWRlc2NyaXB0b3JJbiAmJiBjdG9yID8gY29udGV4dEluW1wic3RhdGljXCJdID8gY3RvciA6IGN0b3IucHJvdG90eXBlIDogbnVsbDtcbiAgdmFyIGRlc2NyaXB0b3IgPSBkZXNjcmlwdG9ySW4gfHwgKHRhcmdldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSkgOiB7fSk7XG4gIHZhciBfLCBkb25lID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHt9O1xuICAgICAgZm9yICh2YXIgcCBpbiBjb250ZXh0SW4pIGNvbnRleHRbcF0gPSBwID09PSBcImFjY2Vzc1wiID8ge30gOiBjb250ZXh0SW5bcF07XG4gICAgICBmb3IgKHZhciBwIGluIGNvbnRleHRJbi5hY2Nlc3MpIGNvbnRleHQuYWNjZXNzW3BdID0gY29udGV4dEluLmFjY2Vzc1twXTtcbiAgICAgIGNvbnRleHQuYWRkSW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiAoZikgeyBpZiAoZG9uZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBhZGQgaW5pdGlhbGl6ZXJzIGFmdGVyIGRlY29yYXRpb24gaGFzIGNvbXBsZXRlZFwiKTsgZXh0cmFJbml0aWFsaXplcnMucHVzaChhY2NlcHQoZiB8fCBudWxsKSk7IH07XG4gICAgICB2YXIgcmVzdWx0ID0gKDAsIGRlY29yYXRvcnNbaV0pKGtpbmQgPT09IFwiYWNjZXNzb3JcIiA/IHsgZ2V0OiBkZXNjcmlwdG9yLmdldCwgc2V0OiBkZXNjcmlwdG9yLnNldCB9IDogZGVzY3JpcHRvcltrZXldLCBjb250ZXh0KTtcbiAgICAgIGlmIChraW5kID09PSBcImFjY2Vzc29yXCIpIHtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB2b2lkIDApIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgdHlwZW9mIHJlc3VsdCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBleHBlY3RlZFwiKTtcbiAgICAgICAgICBpZiAoXyA9IGFjY2VwdChyZXN1bHQuZ2V0KSkgZGVzY3JpcHRvci5nZXQgPSBfO1xuICAgICAgICAgIGlmIChfID0gYWNjZXB0KHJlc3VsdC5zZXQpKSBkZXNjcmlwdG9yLnNldCA9IF87XG4gICAgICAgICAgaWYgKF8gPSBhY2NlcHQocmVzdWx0LmluaXQpKSBpbml0aWFsaXplcnMudW5zaGlmdChfKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKF8gPSBhY2NlcHQocmVzdWx0KSkge1xuICAgICAgICAgIGlmIChraW5kID09PSBcImZpZWxkXCIpIGluaXRpYWxpemVycy51bnNoaWZ0KF8pO1xuICAgICAgICAgIGVsc2UgZGVzY3JpcHRvcltrZXldID0gXztcbiAgICAgIH1cbiAgfVxuICBpZiAodGFyZ2V0KSBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb250ZXh0SW4ubmFtZSwgZGVzY3JpcHRvcik7XG4gIGRvbmUgPSB0cnVlO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fcnVuSW5pdGlhbGl6ZXJzKHRoaXNBcmcsIGluaXRpYWxpemVycywgdmFsdWUpIHtcbiAgdmFyIHVzZVZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgaW5pdGlhbGl6ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZSA9IHVzZVZhbHVlID8gaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZywgdmFsdWUpIDogaW5pdGlhbGl6ZXJzW2ldLmNhbGwodGhpc0FyZyk7XG4gIH1cbiAgcmV0dXJuIHVzZVZhbHVlID8gdmFsdWUgOiB2b2lkIDA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gX19wcm9wS2V5KHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSBcInN5bWJvbFwiID8geCA6IFwiXCIuY29uY2F0KHgpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fc2V0RnVuY3Rpb25OYW1lKGYsIG5hbWUsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIG5hbWUgPSBuYW1lLmRlc2NyaXB0aW9uID8gXCJbXCIuY29uY2F0KG5hbWUuZGVzY3JpcHRpb24sIFwiXVwiKSA6IFwiXCI7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZiwgXCJuYW1lXCIsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogcHJlZml4ID8gXCJcIi5jb25jYXQocHJlZml4LCBcIiBcIiwgbmFtZSkgOiBuYW1lIH0pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcbiAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZyA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSk7XG4gIHJldHVybiBnLm5leHQgPSB2ZXJiKDApLCBnW1widGhyb3dcIl0gPSB2ZXJiKDEpLCBnW1wicmV0dXJuXCJdID0gdmVyYigyKSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICB9XG59XG5cbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICB9XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICBvW2syXSA9IG1ba107XG59KTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XG4gIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcbiAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgIH1cbiAgfTtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcbiAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICBpZiAoIW0pIHJldHVybiBvO1xuICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgdHJ5IHtcbiAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xuICB9XG4gIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICB9XG4gICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgfVxuICByZXR1cm4gYXI7XG59XG5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xuICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcbiAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcbiAgcmV0dXJuIGFyO1xufVxuXG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcbiAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgIHJba10gPSBhW2pdO1xuICByZXR1cm4gcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20sIHBhY2spIHtcbiAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcbiAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xuICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XG4gIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XG4gIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XG4gIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxuICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XG4gIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxuICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XG4gIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cbiAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XG4gIHZhciBpLCBwO1xuICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xuICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XG4gIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG4gIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcbiAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxuICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xuICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxuICByZXR1cm4gY29va2VkO1xufTtcblxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgb1tcImRlZmF1bHRcIl0gPSB2O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcbiAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XG4gIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xuICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XG4gIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XG4gIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcbiAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xuICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xuICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRJbihzdGF0ZSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHJlY2VpdmVyID09PSBudWxsIHx8ICh0eXBlb2YgcmVjZWl2ZXIgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlY2VpdmVyICE9PSBcImZ1bmN0aW9uXCIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHVzZSAnaW4nIG9wZXJhdG9yIG9uIG5vbi1vYmplY3RcIik7XG4gIHJldHVybiB0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyID09PSBzdGF0ZSA6IHN0YXRlLmhhcyhyZWNlaXZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2FkZERpc3Bvc2FibGVSZXNvdXJjZShlbnYsIHZhbHVlLCBhc3luYykge1xuICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHZvaWQgMCkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3QgZXhwZWN0ZWQuXCIpO1xuICAgIHZhciBkaXNwb3NlLCBpbm5lcjtcbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIGlmICghU3ltYm9sLmFzeW5jRGlzcG9zZSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0Rpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5hc3luY0Rpc3Bvc2VdO1xuICAgIH1cbiAgICBpZiAoZGlzcG9zZSA9PT0gdm9pZCAwKSB7XG4gICAgICBpZiAoIVN5bWJvbC5kaXNwb3NlKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmRpc3Bvc2UgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgICAgZGlzcG9zZSA9IHZhbHVlW1N5bWJvbC5kaXNwb3NlXTtcbiAgICAgIGlmIChhc3luYykgaW5uZXIgPSBkaXNwb3NlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRpc3Bvc2UgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdCBub3QgZGlzcG9zYWJsZS5cIik7XG4gICAgaWYgKGlubmVyKSBkaXNwb3NlID0gZnVuY3Rpb24oKSB7IHRyeSB7IGlubmVyLmNhbGwodGhpcyk7IH0gY2F0Y2ggKGUpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KGUpOyB9IH07XG4gICAgZW52LnN0YWNrLnB1c2goeyB2YWx1ZTogdmFsdWUsIGRpc3Bvc2U6IGRpc3Bvc2UsIGFzeW5jOiBhc3luYyB9KTtcbiAgfVxuICBlbHNlIGlmIChhc3luYykge1xuICAgIGVudi5zdGFjay5wdXNoKHsgYXN5bmM6IHRydWUgfSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG52YXIgX1N1cHByZXNzZWRFcnJvciA9IHR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2Rpc3Bvc2VSZXNvdXJjZXMoZW52KSB7XG4gIGZ1bmN0aW9uIGZhaWwoZSkge1xuICAgIGVudi5lcnJvciA9IGVudi5oYXNFcnJvciA/IG5ldyBfU3VwcHJlc3NlZEVycm9yKGUsIGVudi5lcnJvciwgXCJBbiBlcnJvciB3YXMgc3VwcHJlc3NlZCBkdXJpbmcgZGlzcG9zYWwuXCIpIDogZTtcbiAgICBlbnYuaGFzRXJyb3IgPSB0cnVlO1xuICB9XG4gIHZhciByLCBzID0gMDtcbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICB3aGlsZSAociA9IGVudi5zdGFjay5wb3AoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFyLmFzeW5jICYmIHMgPT09IDEpIHJldHVybiBzID0gMCwgZW52LnN0YWNrLnB1c2gociksIFByb21pc2UucmVzb2x2ZSgpLnRoZW4obmV4dCk7XG4gICAgICAgIGlmIChyLmRpc3Bvc2UpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gci5kaXNwb3NlLmNhbGwoci52YWx1ZSk7XG4gICAgICAgICAgaWYgKHIuYXN5bmMpIHJldHVybiBzIHw9IDIsIFByb21pc2UucmVzb2x2ZShyZXN1bHQpLnRoZW4obmV4dCwgZnVuY3Rpb24oZSkgeyBmYWlsKGUpOyByZXR1cm4gbmV4dCgpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHMgfD0gMTtcbiAgICAgIH1cbiAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGZhaWwoZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzID09PSAxKSByZXR1cm4gZW52Lmhhc0Vycm9yID8gUHJvbWlzZS5yZWplY3QoZW52LmVycm9yKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGlmIChlbnYuaGFzRXJyb3IpIHRocm93IGVudi5lcnJvcjtcbiAgfVxuICByZXR1cm4gbmV4dCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24ocGF0aCwgcHJlc2VydmVKc3gpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIC9eXFwuXFwuP1xcLy8udGVzdChwYXRoKSkge1xuICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFwuKHRzeCkkfCgoPzpcXC5kKT8pKCg/OlxcLlteLi9dKz8pPylcXC4oW2NtXT8pdHMkL2ksIGZ1bmN0aW9uIChtLCB0c3gsIGQsIGV4dCwgY20pIHtcbiAgICAgICAgICByZXR1cm4gdHN4ID8gcHJlc2VydmVKc3ggPyBcIi5qc3hcIiA6IFwiLmpzXCIgOiBkICYmICghZXh0IHx8ICFjbSkgPyBtIDogKGQgKyBleHQgKyBcIi5cIiArIGNtLnRvTG93ZXJDYXNlKCkgKyBcImpzXCIpO1xuICAgICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgX19leHRlbmRzLFxuICBfX2Fzc2lnbixcbiAgX19yZXN0LFxuICBfX2RlY29yYXRlLFxuICBfX3BhcmFtLFxuICBfX2VzRGVjb3JhdGUsXG4gIF9fcnVuSW5pdGlhbGl6ZXJzLFxuICBfX3Byb3BLZXksXG4gIF9fc2V0RnVuY3Rpb25OYW1lLFxuICBfX21ldGFkYXRhLFxuICBfX2F3YWl0ZXIsXG4gIF9fZ2VuZXJhdG9yLFxuICBfX2NyZWF0ZUJpbmRpbmcsXG4gIF9fZXhwb3J0U3RhcixcbiAgX192YWx1ZXMsXG4gIF9fcmVhZCxcbiAgX19zcHJlYWQsXG4gIF9fc3ByZWFkQXJyYXlzLFxuICBfX3NwcmVhZEFycmF5LFxuICBfX2F3YWl0LFxuICBfX2FzeW5jR2VuZXJhdG9yLFxuICBfX2FzeW5jRGVsZWdhdG9yLFxuICBfX2FzeW5jVmFsdWVzLFxuICBfX21ha2VUZW1wbGF0ZU9iamVjdCxcbiAgX19pbXBvcnRTdGFyLFxuICBfX2ltcG9ydERlZmF1bHQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRHZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRTZXQsXG4gIF9fY2xhc3NQcml2YXRlRmllbGRJbixcbiAgX19hZGREaXNwb3NhYmxlUmVzb3VyY2UsXG4gIF9fZGlzcG9zZVJlc291cmNlcyxcbiAgX19yZXdyaXRlUmVsYXRpdmVJbXBvcnRFeHRlbnNpb24sXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgbWF0ZXJpYWxzIGZyb20gXCJAbHRzL21hdGVyaWFscy9sZWdhY3kvbGVnYWN5LWdyaWRcIjtcclxuZXhwb3J0IHsgbWF0ZXJpYWxzIH07XHJcbmV4cG9ydCBkZWZhdWx0IG1hdGVyaWFscztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9