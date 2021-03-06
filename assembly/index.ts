// import 'allocator/tlsf';
import { RayTracer } from './RayTracer';
import { Sphere } from './Sphere';
import { Vector3 } from './Vector3';

declare namespace console {
  function debug(val: number): void;
}

let elements: Sphere[] = [];

export function init(width: i32 = 320, height: i32 = 240, originX: f32 = 0, originY: f32 = 0, originZ: f32 = 0): void {
  
  RayTracer.renderBufferWidth = width;
  RayTracer.renderBufferHeight = height;
  RayTracer.renderBufferLength = width * height * sizeof<i32>();

  elements.push(
    new Sphere(
      new Vector3(0.0, -10004, -20),
      10000,
      new Vector3(0.2, 0.2, 0.2),
      0,
      0,
      new Vector3(),
    ),
  );

  elements.push(
    new Sphere(
      new Vector3(0, 0, -20),
      4,
      new Vector3(1.0, 0, 0),
      1,
      0.5,
      new Vector3(),
    ),
  );
  elements.push(
    new Sphere(
      new Vector3(5, -1, -15),
      2,
      new Vector3(0.9, 0, 0),
      1,
      0,
      new Vector3(),
    ),
  );
  elements.push(
    new Sphere(
      new Vector3(5, 0, -25),
      3,
      new Vector3(0.65, 0.77, 0.97),
      1,
      0,
      new Vector3(),
    ),
  );
  elements.push(
    new Sphere(
      new Vector3(-5.5, 0, -15),
      3,
      new Vector3(0.9, 0, 0),
      1,
      0,
      new Vector3(),
    ),
  );

  elements.push(
    new Sphere(
      new Vector3(0, 20, -30),
      3,
      new Vector3(),
      0,
      0,
      new Vector3(1.2, 1.2, 1.2),
    ),
  );
  elements.push(
    new Sphere(
      new Vector3(0, 10, 10),
      3,
      new Vector3(),
      0,
      0,
      new Vector3(1, 1, 1),
    ),
  );
}

export function trace (width: i32, height: i32, originX: f32, originY: f32, originZ: f32): void {
  let backgroundColor: Vector3 = new Vector3(2.0, 2.0, 2.0);

  let rayOrigin: Vector3 = new Vector3(originX, originY, originZ);
  RayTracer.render(width, height, elements, backgroundColor, rayOrigin);
}

// export function addSphere(): void {
//   let toto: Pixel = new Pixel();
//   toto.b = 50;
//   toto.r = 50;
//   toto.g = 50;
//   console.debug(changetype<usize>(toto));
// }

// export function test(): u8 {
//   setPixel(0, 0);
//   let toto: Pixel = getPixel(0, 0);
//   // toto.b = 255;
//   // toto.r = 255;
//   // toto.g = 255;
//   console.debug(changetype<usize>(toto));
//   return toto.r;
// }
