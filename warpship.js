// текстуры 
function texture(){
  // текстура тор
  var torus_link = "https://static.wixstatic.com/media/c65ab5_d150ef72302b4111a36dde4e6bdad8bb~mv2_d_5616_3744_s_4_2.jpg";
  var torus_texture = new THREE.TextureLoader().load(torus_link);
  // Текстура окужения
  var Mirlink = "http://livelab.spb.ru/images/zemlya1.jpg";
  var MirTexture = new THREE.TextureLoader().load(Mirlink);
  // Текстура двигателя
  var material_cylinder_engine_link = "https://img1.akspic.ru/attachments/originals/5/8/1/7/0/107185-drevesina-tekstura-beton-seryj_cvet-stena-3264x2448.jpg";
  var cylinder_engine_texture = new THREE.TextureLoader().load(material_cylinder_engine_link);

  // Текстура стекла кабины
  var material_cabin_main_link = "https://img1.akspic.ru/attachments/originals/5/8/1/7/0/107185-drevesina-tekstura-beton-seryj_cvet-stena-3264x2448.jpg";
  var material_cabin_main_texture = new THREE.TextureLoader().load(material_cabin_main_link);


  // Текстура тела коробля
  var material_body_link = "https://img1.akspic.ru/attachments/originals/5/8/1/7/0/107185-drevesina-tekstura-beton-seryj_cvet-stena-3264x2448.jpg";
  var material_body_texture = new THREE.TextureLoader().load(material_body_link);


  return {MirTexture,
          torus_texture,
          cylinder_engine_texture,
          material_cabin_main_texture,
          material_body_texture
        };
}




//Цвета материалов с текстурами
  color_material_cylinder_engine = {color: 0xFFFFFF,
                                    map: texture().cylinder_engine_texture
                                    };

// Текстура сопел
  color_nozzle_material = {color: 0x708090,
                          map: texture().cylinder_engine_texture
                          };                                  
// текстура колец
  color_torus_material = { color: 0xFFFAFA, 
                          map: texture().torus_texture ,
                          // side: THREE.BackSide
                          };

//--------------// Шаблон тектсуры цвета для тела коробля\\----------------------------\\
              body_color_texture = {color: 0x696969,
                                    map: texture().material_body_texture
                                    };


  color_material_cylinder = body_color_texture;
  color_material_cylinder2 = body_color_texture;
  color_sphere_chamfer = body_color_texture;

  //Cabin color
  color_material_chamfer_cabin = body_color_texture;
  color_material_cabin_center = body_color_texture ;
  
  color_material_cabin_main = { color: 0x00FFFF , 
                                opacity: 0.7,
                                transparent: true,
                                map: texture().material_cabin_main_texture
                              };


if  (tick==0) {
    // if (typeof(sceneexist)=='undefined') {
     WW=520; HH=303; OpenCanvas('wCanvas',WW,HH)
     var scene, camera, renderer; CreateScene(WW,HH);
    
     X=0; Y=0; Z=0; W=10; K=0;
    
        world=DrawWorld();
        world.scale.set(W,W,W);
        world.position.set(X,Y,Z);
        scene.add(world);

        Tor = drawtorus();
        Tor.scale.set(W,W,W);
        Tor.position.set(X+0.2,Y-0.2,Z-10);
        scene.add(Tor)

        Ship = drawbodyship();
        Ship.scale.set(W,W,W);
        Ship.position.set(X,Y,Z);
        scene.add(Ship);

     
    
    render();
    }
    
    if (tick<100) restart(100);
    
    
    
    function render(){

      
      Tor.rotation.z += 0.01;
      

            requestAnimationFrame(render);
            controls.update();
            renderer.render(scene,camera);
            if (tick>0) renderer.render(scene,camera);
      }
      


    function DrawWorld(){

        var world_geometry = new THREE.SphereGeometry( 1000,60,60 );
        var world_material = new THREE.MeshBasicMaterial ( 
          { color: 0xffffff ,
          map: texture().MirTexture ,
          side: THREE.BackSide
      } 
    );
    
      var world_mesh = new THREE.Mesh( world_geometry, world_material );
      var world = new THREE.Object3D();
      world.add(world_mesh);
      world.scale.set(0.01, 0.01, 0.01);
        
       var out = new THREE.Object3D();
       out.add(world);
    return out;
    
    }
    
  
    
    
    function drawtorus(){

      //Кольца 
      const geometry = new THREE.TorusGeometry( 15, 3, 10, 100 );
      const material = new THREE.MeshPhongMaterial( color_torus_material );
      const torus = new THREE.Mesh( geometry, material );

      //Свет \
      const color = 0x00FFFF;
      const intensity = 2;
      const light = new THREE.PointLight(color, intensity);
      light.position.set(20, 1, 20);
      light.rotation.z = 10 ;

      //Певрое кольцо/крыло
      wing = torus.clone();
      wing.scale.set(1,1,1);
      wing.position.set(1,1,1);
      //Второе кольцо/крыло
      wing2 = torus.clone();
      wing2.scale.set(1,1,1);
      wing2.position.set(1,1,20);

      // Контейнер 3д обьектов
      var wingships = new THREE.Object3D();
      wingships.add(wing);
      wingships.add(wing2);
      wingships.add(light);

   

      s=0.1; wingships.scale.set(s,s,s);

      var out = new THREE.Group();
      out.add(wingships);


    return out;
    }


    function drawbodyship(){
         // Цилиндр 
      const geometry_cylinder = new THREE.CylinderGeometry( 5, 5, 20, 32 );
      const material_cylinder = new THREE.MeshPhongMaterial(color_material_cylinder);
      const material_cylinder2 = new THREE.MeshPhongMaterial(color_material_cylinder2 );
      const cylinder2 = new THREE.Mesh( geometry_cylinder, material_cylinder2 );
      const cylinder = new THREE.Mesh( geometry_cylinder, material_cylinder );

       //Основное тело 
       Body = cylinder.clone();
       Body.scale.set(1,2,1);
       Body.position.set(1,1,1);
       Body.rotation.x = 1.605;
      //Утолщение в теле
       lounch1 = cylinder2.clone();
       lounch1.scale.set(1.25,1,1.25);
       lounch1.position.set(1,1,-10);
       lounch1.rotation.x = 1.57;

    // Плавный переход 
    const geometry = new THREE.SphereGeometry( 5, 32, 32 );
    const material = new THREE.MeshPhongMaterial(color_sphere_chamfer );
    const sphere_chamfer = new THREE.Mesh( geometry, material );

      // центер
      chamfer = sphere_chamfer.clone();
      chamfer.scale.set(1.25,1.25,1.25);
      chamfer.position.set(1,1,0.5);
      chamfer.rotation.x = 1.605;

    const geometry_chamfer_cabin = new THREE.SphereBufferGeometry(5, 32, 32, 0, 2*Math.PI, 0, 0.5 * Math.PI);
    const material_chamfer_cabin = new THREE.MeshPhongMaterial( color_material_chamfer_cabin );
    const sphere_chamfer_cabin = new THREE.Mesh( geometry_chamfer_cabin, material_chamfer_cabin );

      //кабина
      chamfer_cabin = sphere_chamfer_cabin.clone();
      chamfer_cabin.scale.set(1,1,1);
      chamfer_cabin.position.set(1,0.35,20);
      chamfer_cabin.rotation.x = 1.605;



      //Кабина центральная часть перед

      const geometry_cabin_center = new THREE.SphereGeometry( 5, 10, 32 );
      const material_cabin_center = new THREE.MeshPhongMaterial( color_material_cabin_center );
      const sphere_cabin_center = new THREE.Mesh( geometry_cabin_center, material_cabin_center );
      
      //Центр
      cabin_center = sphere_cabin_center.clone();
      cabin_center.scale.set(1.5,2,0.5);
      cabin_center.position.set(1,0.4,21);
      cabin_center.rotation.x = 1.605;


      //Основное тело кабины
      
      const geometry_cabin_main = new THREE.SphereGeometry( 5, 10, 32 );
      const material_cabin_main = new THREE.MeshPhongMaterial(color_material_cabin_main );
      const sphere_cabin_main = new THREE.Mesh( geometry_cabin_main,material_cabin_main );

      cabin_main = sphere_cabin_main.clone();
      cabin_main.scale.set(0.85,1.65,1);
      cabin_main.position.set(1,0.4,20);
      cabin_main.rotation.x = 1.605;

      
    // Двигатель 
    const geometry_cylinder_engine = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    const material_cylinder_engine = new THREE.MeshPhongMaterial(color_material_cylinder_engine);
    const cylinder_engine = new THREE.Mesh( geometry_cylinder_engine, material_cylinder_engine );
      
    engine_left = cylinder_engine.clone();
    engine_left.scale.set(0.5,0.9,0.5);
    engine_left.position.set(8,1,-12);
    engine_left.rotation.x = 1.605;

    engine_right = cylinder_engine.clone();
    engine_right.scale.set(0.5,0.9,0.5);
    engine_right.position.set(-6,1,-12);
    engine_right.rotation.x = 1.605;

    engine_top = cylinder_engine.clone();
    engine_top.scale.set(0.5,0.9,0.5);
    engine_top.position.set(1,8,-12);
    engine_top.rotation.x = 1.605;

    engine_bottom = cylinder_engine.clone();
    engine_bottom.scale.set(0.5,0.9,0.5);
    engine_bottom.position.set(1,-6,-12);
    engine_bottom.rotation.x = 1.605;



    //Сопла

    const nozzle_geometry = new THREE.ConeGeometry(5, 10, 80, 4);
    const nozzle_material = new THREE.MeshBasicMaterial( color_nozzle_material );
    const nozzle_cone = new THREE.Mesh( nozzle_geometry, nozzle_material );

    nozzle_left = nozzle_cone.clone();
    nozzle_left.scale.set(0.5,0.9,0.5);
    nozzle_left.position.set(8,1,-20);
    nozzle_left.rotation.x = 1.605;

    nozzle_right = nozzle_cone.clone();
    nozzle_right.scale.set(0.5,0.9,0.5);
    nozzle_right.position.set(-6,1,-20);
    nozzle_right.rotation.x = 1.605;

    nozzle_top = nozzle_cone.clone();
    nozzle_top.scale.set(0.5,0.9,0.5);
    nozzle_top.position.set(1,8,-20);
    nozzle_top.rotation.x = 1.605;

    nozzle_bottom = nozzle_cone.clone();
    nozzle_bottom.scale.set(0.5,0.9,0.5);
    nozzle_bottom.position.set(1,-6,-20);
    nozzle_bottom.rotation.x = 1.605;


    // support
    const geometry_cylinder_support = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    const material_cylinder_support = new THREE.MeshPhongMaterial(color_material_cylinder_engine);
    const cylinder_support = new THREE.Mesh( geometry_cylinder_support, material_cylinder_support );

  

    support_rear_left = cylinder_support.clone();
    support_rear_left.scale.set(0.2,1.45,0.2);
    support_rear_left.position.set(0.75,1,-9);
    support_rear_left.rotation.z = -0.75;

    support_front = cylinder_support.clone();
    support_front.scale.set(0.2,1.45,0.2);
    support_front.position.set(1,1.1,10);
    support_front.rotation.z = 1;



      var bodyship = new THREE.Object3D();
      
      bodyship.add(Body);
      bodyship.add(lounch1);
      bodyship.add(chamfer);

      bodyship.add(cabin_center);
      bodyship.add(cabin_main);
      bodyship.add(chamfer_cabin);

      bodyship.add(engine_left);
      bodyship.add(engine_right);
      bodyship.add(engine_top);
      bodyship.add(engine_bottom);

      bodyship.add(nozzle_left);
      bodyship.add(nozzle_right);
      bodyship.add(nozzle_top);
      bodyship.add(nozzle_bottom);

 
      bodyship.add(support_front);
      bodyship.add(support_rear_left);




      s=0.1; bodyship.scale.set(s,s,s);

      var out = new THREE.Group();
      out.add(bodyship);

    return out;



    }
    
   
    
    function CreateScene(WW,HH) {
    if (typeof(sceneexist)=='undefined') { sceneexist=true;
      
      
      
      
      // объявление сцены
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x7F6000 );
        camera = new THREE.PerspectiveCamera(35,WW/HH,1,1000,-1 );
        camera.position.x = 10;
        camera.position.y = 100;
        camera.position.z = 1;
          
         camera.lookAt( scene.position );
         renderer = new THREE.WebGLRenderer({
         alpha: true, antialias: true});
    
         renderer.setPixelRatio( window.devicePixelRatio );
      // привяжем отрисовку к html и высоте канвы
      // renderer.setSize( window.innerWidth, window.innerHeight );
         document.getElementById("wCanvas").appendChild(renderer.domElement);
         renderer.setSize(WW,HH);
      // установим модуль управления камерой
         controls = new THREE.TrackballControls( camera,renderer.domElement );
         controls.rotateSpeed = 1.0;
         controls.zoomSpeed = 1.2;
         controls.panSpeed = 0.8;
         controls.noZoom = false;
         controls.noPan = true;
         controls.staticMoving = false;
         controls.dynamicDampingFactor = 0.2;
     
    
    
     // источники света
       scene.add( new THREE.AmbientLight( 0xD2D2D2 ) );
       var directionalLight = new THREE.DirectionalLight( 0xD2D2D2, 0.5 );
       directionalLight.position.set(-5,2,4).normalize();
       scene.add( directionalLight );
    directionalLight.position.set(-5,2,4).normalize();
    scene.add( directionalLight );

    }}

    
     
