import React, {Component, createRef} from 'react'
import styles from '/styles/room.module.scss'

import * as THREE from "three"
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {RectAreaLightHelper} from 'three/addons/helpers/RectAreaLightHelper.js'
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js'
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js'


export const globalHelper = {
  connected: false,
  shouldLoadMap: false
}
export default class Room extends Component {
  initialized = false
  canvasCont = createRef()
  connected = false

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
    })
    window.removeEventListener('mousemove', () => {
    })
  }

  componentDidMount() {

    if (this.initialized) return
    this.initialized = true



    const parentNode = this.canvasCont.current
    let camera, scene, renderer, controls

    let arrowHelper, room, cube, cubes, cubeSize, dummy, colCount,
      roomGeometryData, roomDimensions
    let wallLeft, wallRight, ceil
    let panel1, panel2, panel3, panelSquare2
    let spotLight
    let flyingLight1, flyingLight2
    let rectLightLeft1, rectLightLeft2
    let config = {}
    let textureLoader

    const mouse = new THREE.Vector2()
    const target = new THREE.Vector2()
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2)

    init()
    render()
    animate(this.connected)

    function init() {
      configInit()

      scene = new THREE.Scene()
      scene.fog = new THREE.Fog(0x05260e, 15, 40)

      camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.25, 5000)

      RectAreaLightUniformsLib.init()
      textureLoader = new THREE.TextureLoader()

      rendererInit()
      lightInit()
      roomUpdate()
      floorInit()
      panelCreate()
      flyingLightCreate()
      cameraUpdate()

      /*
       controls = new OrbitControls(camera, renderer.domElement);
       controls.addEventListener('change', render); // use if there is no animation loop
       controls.minDistance = .2;
       controls.maxDistance = 300;
       controls.target.set(config.cameraDirection.x, config.cameraDirection.y, config.cameraDirection.z);
       controls.update();
       */

      // document.body.appendChild(renderer.domElement);
      parentNode.appendChild(renderer.domElement)

      window.addEventListener('resize', onWindowResize)
      document.addEventListener('mousemove', onMouseMove, false)

    }

    function onWindowResize() {
      // https://codepen.io/misterkidult/pen/dybgapB?editors=0010
      const width = window.innerWidth
      const height = window.innerHeight

      windowHalf.set(width / 2, height / 2)

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      roomUpdate()
      floorInit()
      render()
    }

    function onMouseMove(event) {
      mouse.x = (event.clientX - windowHalf.x)
      mouse.y = (event.clientY - windowHalf.x)
    }

    function animate(connected) {
      target.x = (1 - mouse.x) * 0.0005
      target.y = (1 - mouse.y) * 0.0005

      //camera.rotation.x += 0.001 * ( target.y - camera.rotation.x );
      camera.rotation.y += 0.005 * (target.x - camera.rotation.y)


      if (connected) {
        camera.rotation.y = 0
        if (camera.position.z > -15) {
          camera.position.z -= 0.07
          spotLight.intensity -= 0.07
          spotLight.decay += 0.07
          rectLightLeft1.power -= 0.7
          rectLightLeft2.power -= 0.7
          rectLightLeft1.intensity -= 0.7
          rectLightLeft2.intensity -= 0.7
          flyingLight1.intensity -= 2
          flyingLight2.intensity -= 2
        } else {
          globalHelper.shouldLoadMap = true
        }

        //console.log(camera.position.z);
      }

      requestAnimationFrame(animate)
      render()
    }

    function configInit() {
      config.cameraOrigin = new THREE.Vector3(0, 1, 0)
      config.cameraDirection = new THREE.Vector3(0, 0, -1)
      colCount = 24
    }

    function rendererInit() {
      // Renderer
      renderer = new THREE.WebGLRenderer({alpha: false, antialias: true})
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x333333, .1) // the default
      //renderer.toneMapping = THREE.ACESFilmicToneMapping;
      //renderer.toneMappingExposure = 1;
      //renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = false
      renderer.shadowMap.type = THREE.BasicShadowMap
      //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.gammaOutput = true
      renderer.gammaFactor = 0.5
      //renderer.shadowMap = THREE.VSMShadowMap;
    }

    function cameraUpdate() {
      camera.position.set(config.cameraOrigin.x, config.cameraOrigin.y, config.cameraOrigin.z)
      camera.lookAt(config.cameraDirection.x, config.cameraDirection.y, config.cameraDirection.z)
      camera.updateProjectionMatrix()

      /*
       if (arrowHelper) {
       console.log(arrowHelper);
       scene.remove(arrowHelper);
       }
       const origin = config.cameraOrigin
       const direction = new THREE.Vector3(0, 0, -1);
       const length = 2;
       const hex = 0xffff00;
       arrowHelper = new THREE.ArrowHelper(direction.normalize(), origin, length, hex, 0.2, 0.1);
       scene.add(arrowHelper);
       */
    }

    function lightInit() {
      // Işık
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
      scene.add(ambientLight)

      /*
       const g = new THREE.SphereGeometry(0.5, 32, 32); // Kürenin boyutu ve ayrıntı seviyesi
       const m = new THREE.MeshBasicMaterial({color: 0xffffff}); // Kürenin rengi (burada beyaz olarak ayarlanmış)
       const sphere = new THREE.Mesh(g, m);
       sphere.position.set(0, 6, -40);
       scene.add(sphere);
       */

      //scene.add(new THREE.HemisphereLight(0xa5a5a5, 0xffffff, 0.0));

      spotLight = new THREE.SpotLight(0x96ffd1, 2)
      spotLight.position.set(0, 6, -60)
      spotLight.angle = 0.8
      spotLight.penumbra = 0.1
      spotLight.decay = 0.240
      spotLight.distance = 40

      spotLight.castShadow = true
      spotLight.shadow.mapSize.width = 1024
      spotLight.shadow.mapSize.height = 1024
      spotLight.shadow.camera.near = 1
      spotLight.shadow.camera.far = 40
      scene.add(spotLight)

      // rect lights
      rectLightLeft1 = new THREE.RectAreaLight(0x23ff00, 1, 0.1, 40)
      rectLightLeft1.power = 2500
      rectLightLeft1.rotateX(Math.PI / 2)
      rectLightLeft1.rotateZ(Math.PI)
      rectLightLeft1.rotateY(Math.PI / 10)
      const rectLightHelper1 = new RectAreaLightHelper(rectLightLeft1)
      rectLightLeft1.add(rectLightHelper1)
      scene.add(rectLightLeft1)

      rectLightLeft2 = new THREE.RectAreaLight(0xff008d, 1, 0.1, 40)
      rectLightLeft2.power = 2500
      rectLightLeft2.rotateX(Math.PI / 2)
      rectLightLeft2.rotateZ(Math.PI)
      rectLightLeft2.rotateY(Math.PI / -10)
      const rectLightHelper2 = new RectAreaLightHelper(rectLightLeft2)
      rectLightLeft2.add(rectLightHelper2)
      scene.add(rectLightLeft2)
    }

    // Yer için döşenecek küpler
    function floorInit() {
      const roomSize = {
        w: room.geometry.parameters.width,
        h: room.geometry.parameters.height,
        d: room.geometry.parameters.depth,
      }

      cubeSize = roomSize.w / colCount

      const bevelSize = cubeSize * 0.05
      const startPoint = {x: -roomSize.w / 2 + cubeSize / 2, z: -roomSize.d + cubeSize / 2, y: cubeSize / 2}
      let rowCount, count
      if (!cube) {
        rowCount = Math.floor(roomSize.d / (roomSize.w / colCount))
        count = colCount * rowCount
        const geometry = new RoundedBoxGeometry(cubeSize, cubeSize, cubeSize, 2, bevelSize)

        let color = new THREE.Color().setHex(Math.random() * 0x00ff7e)

        const emissiveColors = [0xff0030, 0x9cfffe, 0xf76df4, 0xd90ebf, 0xeb1959]
        const materialRed = new THREE.MeshStandardMaterial({
          metalness: 0.9,   // between 0 and 1
          roughness: 0.127, // between 0 and 1
          color: 0xff00f6,
          //emissive: emissiveColors[Math.floor(Math.random() * emissiveColors.length)],
          emissiveIntensity: 0.4,
          //envMap: envMap,
        })

        //const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        cube = new THREE.Mesh(geometry, materialRed)
        cube.receiveShadow = true
        cube.position.set(startPoint.x, startPoint.y, startPoint.z)
        scene.add(cube)

        const material = new THREE.MeshStandardMaterial({
          metalness: 0.90,   // between 0 and 1
          roughness: 0.35, // between 0 and 1
          color: 0xFFFFFF,
          //envMap: envMap,
        })
        cubes = new THREE.InstancedMesh(geometry, material, count)
        cubes.castShadow = true
        cubes.receiveShadow = true
        cubes.instanceMatrix.setUsage(THREE.DynamicDrawUsage) // will be updated every frame
        scene.add(cubes)

        dummy = new THREE.Object3D()

        let index = 0
        let positionx, positiony, positionz
        const matrix = new THREE.Matrix4()
        for (let z = 0; z < rowCount; z++) {
          for (let x = 0; x < colCount; x++) {

            positionx = startPoint.x + (x * cubeSize)
            positiony = startPoint.y + (cubeSize * .5)
            // yükseltiler
            if (Math.random() > 0.5) {
              positiony = startPoint.y + ((Math.random() * cubeSize) * .3)
              cubes.setColorAt(index, color)
            }
            positionz = startPoint.z + (z * cubeSize)

            // renkli küp ekle
            if (index > count * .7 && Math.random() > 0.95) {
              let positionyBackup = positiony
              positiony = -2 * cubeSize

              //cube.material.emissive.setHex(emissiveColors[Math.floor(Math.random() * emissiveColors.length)]);
              color = new THREE.Color(emissiveColors[Math.floor(Math.random() * emissiveColors.length)])

              let cclone = cube.clone()
              cclone.material = cube.material.clone()
              cclone.material.emissive.set(color)
              cclone.material.color.set(color)
              cclone.position.set(
                positionx,
                positionyBackup * 1.2,
                positionz
              )
              // emissive: Math.random() * 0xff00f6,

              scene.add(cclone)
            }

            matrix.setPosition(positionx, positiony, positionz)

            cubes.setMatrixAt(index, matrix)

            index++
            //cubes.updateMatrix();
            //cubes.setMatrixAt(x++, dummy.matrix);
          }
        }

        // Döşemeyi oluştur
        /*
         for (let i = 0; i < colCount; i++) {
         for (let j = 0; j < rowCount; j++) {
         let cclone = cube.clone();
         cclone.position.set(
         startPoint.x + (i * cubeSize),
         startPoint.y + (Math.random() * cubeSize),
         startPoint.z + (j * cubeSize)
         );
         scene.add(cclone);
         }
         }
         */
      }

      roomUpdate()
    }

    function roomUpdate() {
      roomGeometryData = {width: 10, height: 10, depth: 40}
      roomDimensions = scaleToScreen(roomGeometryData.width, roomGeometryData.height)
      const hRatio = 1.45
      const roomGeo = new THREE.BoxGeometry(roomDimensions.width, roomDimensions.height * hRatio, roomGeometryData.depth)

      // Yoksa yeni yarat ve sahneye ekle
      if (!room) {
        //const roomMat = new THREE.MeshBasicMaterial({color: 0x083383, side: THREE.BackSide});
        const roomMat = new THREE.MeshStandardMaterial({color: 0x163e28, side: THREE.BackSide})
        room = new THREE.Mesh(roomGeo, roomMat)
        scene.add(room)
      }
      // oda zaten varsa update et
      else {
        room.geometry = roomGeo
      }
      room.position.set(0, roomDimensions.height / 2 * 1.45, roomGeometryData.depth / 2 * -1)

      config.cameraOrigin.y = roomDimensions.height * .3
      config.cameraDirection.y = config.cameraOrigin.y * 1.01
      cameraUpdate()

      spotLight.position.set(0, roomDimensions.height * .99, -roomGeometryData.depth)
      spotLight.distance = roomGeometryData.depth

      // Duvarlar

      const path = 'assets/env/'
      const format = '.jpg'
      const urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
      ]
      const reflectionCube = new THREE.CubeTextureLoader().load(urls)

      const settings = {
        metalness: 1.0,
        roughness: 0.4,
        ambientIntensity: 0.5,
        aoMapIntensity: 1.0,
        envMapIntensity: 0.5,
        displacementScale: 2.436143, // from original model
        normalScale: 2.0
      }

      if (!wallLeft) {
        // Duvar Material
        let repeat1 = 12, repeat2 = 4
        const normalMap = textureLoader.load('assets/wall/futuristic-panels1-normal-dx.png')
        normalMap.wrapS = THREE.RepeatWrapping
        normalMap.wrapT = THREE.RepeatWrapping
        normalMap.repeat.set(repeat1, repeat2)

        const aoMap = textureLoader.load('assets/wall/futuristic-panels1-ao.png')
        aoMap.wrapS = THREE.RepeatWrapping
        aoMap.wrapT = THREE.RepeatWrapping
        aoMap.repeat.set(repeat1, repeat2)

        const displacementMap = textureLoader.load('assets/wall/futuristic-panels1-height.png')
        displacementMap.wrapS = THREE.RepeatWrapping
        displacementMap.wrapT = THREE.RepeatWrapping
        displacementMap.repeat.set(repeat1, repeat2)

        const metalnessMap = textureLoader.load('assets/wall/futuristic-panels1-metallic.png')
        metalnessMap.wrapS = THREE.RepeatWrapping
        metalnessMap.wrapT = THREE.RepeatWrapping
        metalnessMap.repeat.set(repeat1, repeat2)

        const roughnessMap = textureLoader.load('assets/wall/futuristic-panels1-roughness.png')
        roughnessMap.wrapS = THREE.RepeatWrapping
        roughnessMap.wrapT = THREE.RepeatWrapping
        roughnessMap.repeat.set(repeat1, repeat2)

        const wallMaterial = new THREE.MeshStandardMaterial({
          shininess: 10,
          specular: 0x111111,

          color: 0x091a03,
          roughnessMap: roughnessMap,
          metalnessMap: metalnessMap,

          normalMap: normalMap,
          normalScale: new THREE.Vector2(1, -1), // why does the normal map require negation in this case?

          aoMap: aoMap,
          aoMapIntensity: 1,

          // displacementMap: displacementMap,
          // displacementScale: settings.displacementScale,
          // displacementBias: -1.4, // from original model

          envMap: reflectionCube,
          envMapIntensity: settings.envMapIntensity,

          side: THREE.FrontSide
        })

        const geometry = new THREE.PlaneGeometry(roomGeometryData.depth, roomDimensions.height * hRatio)
        // const material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        wallLeft = new THREE.Mesh(geometry, wallMaterial)
        wallLeft.rotateY(Math.PI / 2)
        wallLeft.receiveShadow = true
        scene.add(wallLeft)

        wallRight = wallLeft.clone()
        wallRight.rotateY(Math.PI)
        scene.add(wallRight)
      }
      // Walls
      const wallGeo = new THREE.PlaneGeometry(roomGeometryData.depth, roomDimensions.height * hRatio)
      wallLeft.geometry = wallGeo
      wallRight.geometry = wallGeo

      wallLeft.position.set((roomDimensions.width / -2) + 0.001, roomDimensions.height * hRatio / 2, -roomGeometryData.depth / 2)
      wallRight.position.set((roomDimensions.width / 2) - 0.001, roomDimensions.height * hRatio / 2, -roomGeometryData.depth / 2)

      if (!ceil) {
        let repeatCeil1 = 8, repeatCeil2 = 2
        const normalMap = textureLoader.load('assets/ceil/metal-ventilation1-normal-dx.png')
        normalMap.wrapS = THREE.RepeatWrapping
        normalMap.wrapT = THREE.RepeatWrapping
        normalMap.repeat.set(repeatCeil1, repeatCeil2)

        const aoMap = textureLoader.load('assets/ceil/metal-ventilation1-ao.png')
        aoMap.wrapS = THREE.RepeatWrapping
        aoMap.wrapT = THREE.RepeatWrapping
        aoMap.repeat.set(repeatCeil1, repeatCeil2)

        const displacementMap = textureLoader.load('assets/ceil/metal-ventilation1-height.png')
        displacementMap.wrapS = THREE.RepeatWrapping
        displacementMap.wrapT = THREE.RepeatWrapping
        displacementMap.repeat.set(repeatCeil1, repeatCeil2)

        const metalnessMap = textureLoader.load('assets/ceil/metal-ventilation1-metallic.png')
        metalnessMap.wrapS = THREE.RepeatWrapping
        metalnessMap.wrapT = THREE.RepeatWrapping
        metalnessMap.repeat.set(repeatCeil1, repeatCeil2)

        const roughnessMap = textureLoader.load('assets/ceil/roughness.png')
        roughnessMap.wrapS = THREE.RepeatWrapping
        roughnessMap.wrapT = THREE.RepeatWrapping
        roughnessMap.repeat.set(repeatCeil1, repeatCeil2)

        const ceilMaterial = new THREE.MeshStandardMaterial({
          color: 0x40131c,
          roughnessMap: roughnessMap,
          metalnessMap: metalnessMap,

          normalMap: normalMap,
          normalScale: new THREE.Vector2(1, -1), // why does the normal map require negation in this case?

          aoMap: aoMap,
          aoMapIntensity: 1,

          // displacementMap: displacementMap,
          // displacementScale: settings.displacementScale,
          // displacementBias: -1.4, // from original model

          envMap: reflectionCube,
          envMapIntensity: settings.envMapIntensity,

          side: THREE.DoubleSide
        })

        const geometry = new THREE.PlaneGeometry(roomGeometryData.depth, roomDimensions.height * hRatio)
        // const material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        ceil = new THREE.Mesh(geometry, ceilMaterial)
        ceil.rotateX(Math.PI / 2)
        ceil.rotateZ(Math.PI / 2)
        ceil.receiveShadow = true
        scene.add(ceil)

      }
      // Ceil
      const ceilGeo = new THREE.PlaneGeometry(roomGeometryData.depth, roomDimensions.width)
      ceil.geometry = ceilGeo
      ceil.position.set(0, roomDimensions.height * hRatio - 0.1, -roomGeometryData.depth / 2)

      // Rect Lights
      rectLightLeft1.position.set((roomDimensions.width / -2) + 0.05, cubeSize * 1.5, -roomGeometryData.depth / 2)
      rectLightLeft2.position.set((roomDimensions.width / 2) - 0.05, cubeSize * 1.5, -roomGeometryData.depth / 2)

      //console.log(roomGeo);
    }

    function panelCreate() {
      const settings = {
        roughness: 1,
        normalScale: 2.0
      }

      if (!panel1) {
        /** Kare 1*/
        const map1 = textureLoader.load('assets/images/square.png')
        const mapLight1 = textureLoader.load('assets/images/squareLight.png')
        const panelMat1 = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          lightMap: mapLight1,
          lightMapIntensity: 5,
          map: map1,
          transparent: true,
          opacity: 1,
          side: THREE.FrontSide
        })
        const panelGeo1 = new THREE.PlaneGeometry(3, 3)
        panel1 = new THREE.Mesh(panelGeo1, panelMat1)
        //panel1.rotateX(Math.PI / 2);
        //panel1.rotateZ(Math.PI / 2);
        panel1.rotateY(Math.PI / 2)
        scene.add(panel1)

        panel1.position.set((roomDimensions.width / -2) + 0.03, roomGeometryData.height * .3, -roomGeometryData.depth * .24)

        // rect lights
        const panelLight1 = new THREE.RectAreaLight(0xa6faff, 1, 3, 3)
        panelLight1.power = 50
        // panelLight1.rotateX(Math.PI / 2);
        panelLight1.rotateZ(Math.PI)
        // panelLight1.rotateY(Math.PI );
        const panelLightHelper1 = new RectAreaLightHelper(panelLight1)
        panelLight1.add(panelLightHelper1)
        panel1.add(panelLight1)

        /** Kare 2*/
        const mapSquare2 = textureLoader.load('assets/images/square2.png')
        const mapLightSquare2 = textureLoader.load('assets/images/squareLight2.png')
        const panelMatSquare2 = new THREE.MeshLambertMaterial({
          color: 0x09e781,
          lightMap: mapLightSquare2,
          lightMapIntensity: 5,
          map: mapSquare2,
          transparent: true,
          opacity: 1,
          side: THREE.FrontSide
        })
        const panelGeoSquare2 = new THREE.PlaneGeometry(3, 3)
        panelSquare2 = new THREE.Mesh(panelGeoSquare2, panelMatSquare2)
        //panel1.rotateX(Math.PI / 2);
        //panel1.rotateZ(Math.PI / 2);
        panelSquare2.rotateY(Math.PI / 2)
        scene.add(panelSquare2)
        panelSquare2.position.set((roomDimensions.width / -2) + 0.03, roomGeometryData.height * .3, -roomGeometryData.depth * .37)

        // rect lights
        const panelLightSquare2 = new THREE.RectAreaLight(0x09e781, 1, 3, 3)
        panelLightSquare2.power = 50
        // panelLight1.rotateX(Math.PI / 2);
        panelLightSquare2.rotateZ(Math.PI)
        // panelLight1.rotateY(Math.PI );
        const panelLightHelperSquare2 = new RectAreaLightHelper(panelLightSquare2)
        panelLightSquare2.add(panelLightHelperSquare2)
        panelSquare2.add(panelLightSquare2)

        /** Dikdörtgen 1 */
        const map2 = textureLoader.load('assets/images/rect1.png')
        const mapLight2 = textureLoader.load('assets/images/rectLight1.png')
        const panelMat2 = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          lightMap: mapLight2,
          lightMapIntensity: 5,
          map: map2,
          transparent: true,
          opacity: 1,
          side: THREE.FrontSide
        })
        const panelGeo2 = new THREE.PlaneGeometry(6, 3)
        panel2 = new THREE.Mesh(panelGeo2, panelMat2)
        //panel1.rotateX(Math.PI / 2);
        panel2.rotateZ(Math.PI)
        panel2.rotateY(Math.PI / 2)
        scene.add(panel2)

        panel2.position.set((roomDimensions.width / 2) - 0.03, roomGeometryData.height * .3, -roomGeometryData.depth * .27)

        // rect lights
        const panelLight2 = new THREE.RectAreaLight(0xa6faff, 1, 6, 3)
        panelLight2.power = 75
        // panelLight1.rotateX(Math.PI / 2);
        panelLight2.rotateZ(Math.PI)
        // panelLight1.rotateY(Math.PI );
        const panelLightHelper2 = new RectAreaLightHelper(panelLight2)
        panelLight2.add(panelLightHelper2)
        panel2.add(panelLight2)

        /** Dikdörtgen 2 */
        const map3 = textureLoader.load('assets/images/rect3.png')
        const mapLight3 = textureLoader.load('assets/images/rectLight3.png')
        const panelMat3 = new THREE.MeshLambertMaterial({
          color: 0x19f319,
          lightMap: mapLight3,
          lightMapIntensity: 5,
          map: map3,
          transparent: true,
          opacity: 1,
          side: THREE.FrontSide
        })
        const panelGeo3 = new THREE.PlaneGeometry(6, 3)
        panel3 = new THREE.Mesh(panelGeo3, panelMat3)
        //panel1.rotateX(Math.PI / 2);
        panel3.rotateZ(Math.PI)
        panel3.rotateY(Math.PI / 2)
        scene.add(panel3)

        panel3.position.set((roomDimensions.width / 2) - 0.03, roomGeometryData.height * .3, -roomGeometryData.depth * .45)

        // rect lights
        const panelLight3 = new THREE.RectAreaLight(0x19f319, 1, 6, 3)
        panelLight3.power = 75
        // panelLight1.rotateX(Math.PI / 2);
        panelLight3.rotateZ(Math.PI)
        // panelLight1.rotateY(Math.PI );
        const panelLightHelper3 = new RectAreaLightHelper(panelLight3)
        panelLight3.add(panelLightHelper3)
        panel3.add(panelLight3)

      }

    }

    function flyingLightCreate() {
      if (!flyingLight1) {
        function generateTexture() {

          const canvas = document.createElement('canvas')
          canvas.width = 2
          canvas.height = 2

          const context = canvas.getContext('2d')
          context.fillStyle = 'white'
          context.fillRect(0, 1, 2, 1)

          return canvas

        }

        function createLight(color) {

          const intensity = 200

          const light = new THREE.PointLight(color, intensity, 20)
          light.castShadow = true
          light.shadow.bias = -0.05 // reduces self-shadowing on double-sided objects

          let geometry = new THREE.SphereGeometry(0.2, 12, 6)
          let material = new THREE.MeshBasicMaterial({color: color})
          material.color.multiplyScalar(intensity)
          let sphere = new THREE.Mesh(geometry, material)
          light.add(sphere)

          const texture = new THREE.CanvasTexture(generateTexture())
          texture.magFilter = THREE.NearestFilter
          texture.wrapT = THREE.RepeatWrapping
          texture.wrapS = THREE.RepeatWrapping
          texture.repeat.set(1, 5)

          geometry = new THREE.SphereGeometry(.5, 32, 8)
          material = new THREE.MeshPhongMaterial({
            color: color,
            side: THREE.DoubleSide,
            alphaMap: texture,
            alphaTest: 0.5
          })

          sphere = new THREE.Mesh(geometry, material)
          sphere.castShadow = true
          sphere.receiveShadow = true
          light.add(sphere)

          return light

        }

        flyingLight1 = createLight(0x23ff00)
        scene.add(flyingLight1)

        flyingLight2 = createLight(0xff008d)
        scene.add(flyingLight2)

      }
    }

    function render() {

      let time = performance.now() * 0.0005

      flyingLight1.position.x = (Math.sin(time * 0.6) * 3)
      flyingLight1.position.y = (Math.sin(time * 0.7) * 1) + 3
      flyingLight1.position.z = (Math.sin(time * 0.8) * 18) - 18

      flyingLight1.rotation.x = time
      flyingLight1.rotation.z = time

      time += 10000

      flyingLight2.position.x = (Math.sin(time * 0.6) * 3)
      flyingLight2.position.y = (Math.sin(time * 0.7) * 1) + 3
      flyingLight2.position.z = (Math.sin(time * 0.8) * 18) - 18

      flyingLight2.rotation.x = time
      flyingLight2.rotation.z = time

      renderer.render(scene, camera)
    }

    function scaleToScreen(width, height) {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      const widthRatio = screenWidth / screenHeight
      const heightRatio = screenHeight / screenWidth

      if (screenWidth !== screenHeight) {
        if (screenWidth < screenHeight) {
          width *= widthRatio
        } else {
          height *= heightRatio
        }
      }

      return {width: width, height: height}
    }
  }

  render() {
    this.connected = globalHelper.connected

    return (
      <>
        <div className={styles.canvasContainer} ref={this.canvasCont}/>
      </>
    )
  }

}