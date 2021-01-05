import { Vector3 } from './Vector3';
import { Sphere } from './Sphere';
import { Intersection } from './Intersection';
import { setPixel } from './Pixel';
import 'math'

// declare namespace console {
//   function debug(val: number): void;
// }

export class RayTracer {
  static renderBufferStartOffset: i32 = 0;
  static renderBufferWidth: i32 = 320;
  static renderBufferHeight: i32 = 240;
  static renderBufferLength: i32 =
    RayTracer.renderBufferHeight * RayTracer.renderBufferWidth * sizeof<i32>();
  static result: Vector3

  static trace(
    rayOrigin: Vector3,
    rayDirection: Vector3,
    depth: f64,
    elements: Sphere[],
    backgroundColor: Vector3,
  ): Vector3 {
    let tnear: f64 = Infinity;
    let sphere: Sphere | null = null;

    for (let i = 0; i < elements.length; i++) {
      let hitInfo: Intersection | null = elements[i].intersect(
        rayOrigin,
        rayDirection,
      );

      if (hitInfo) {
        if (hitInfo.t0 < 0) {
          hitInfo.t0 = hitInfo.t1;
        }
        if (hitInfo.t0 < tnear) {
          tnear = hitInfo.t0;
          sphere = elements[i];
        }
      }
      // memory.free(changetype<usize>(hitInfo));
    }

    if (!sphere) {
      return backgroundColor // .clone();
    }

    let t: f64 = tnear / 100.0
    RayTracer.result.x = t
    RayTracer.result.y = t
    RayTracer.result.z = t

    return RayTracer.result

    /*
    let surfaceColor = new Vector3();
    let tmp = rayDirection.clone();
    let intersectionPoint = rayOrigin.clone().add(tmp.multiply(tnear));
    // memory.free(changetype<usize>(tmp));
    let intersectionNormal = sphere.normalize(intersectionPoint);

    let bias = 1e-4;

    let inside = false;

    if (rayDirection.dotProduct(intersectionNormal) > 0) {
      intersectionNormal.reverse();
      inside = true;
    }

    for (let i = 0; i < elements.length; i++) {
      if (
        elements[i].emissionColor.x > 0 ||
        elements[i].emissionColor.y > 0 ||
        elements[i].emissionColor.z > 0
      ) {
        let transmission: Vector3 = new Vector3(1, 1, 1);

        let tmp3 = elements[i].center.clone();

        let lightDirection = elements[i].center
          .clone()
          .subtract(intersectionPoint)
          .normalize();

        for (let j = 0; j < elements.length; j++) {
          if (i !== j) {
            let tmp = intersectionPoint.clone();
            let tmp2 = intersectionNormal.clone();

            let hitInfo: Intersection | null = elements[j].intersect(
              tmp.add(tmp2.multiply(bias)),
              lightDirection,
            );
            if (hitInfo) {
              transmission.x = 0;
              transmission.y = 0;
              transmission.z = 0;
              // memory.free(changetype<usize>(hitInfo));
              break;
            }
            // memory.free(changetype<usize>(tmp));
            // memory.free(changetype<usize>(tmp2));
          }
        }

        let lightRatio = max(0, intersectionNormal.dotProduct(lightDirection));
        let tmp = sphere.surfaceColor.clone();
        let tmp2 = elements[i].emissionColor.clone();

        surfaceColor.add(
          tmp.product(transmission).product(tmp2.multiply(lightRatio)),
        );

        // memory.free(changetype<usize>(lightDirection));
        // memory.free(changetype<usize>(transmission));
        // memory.free(changetype<usize>(tmp));
        // memory.free(changetype<usize>(tmp2));
      }
    }

    surfaceColor.add(sphere.emissionColor);
    // memory.free(changetype<usize>(intersectionNormal));
    return surfaceColor;
  
    */
  }

  static render(
    width: i32,
    height: i32,
    elements: Sphere[],
    backgroundColor: Vector3,
    rayOrigin: Vector3
  ): void {
    let invWidth: f64 = 1 / width;
    let invHeight: f64 = 1 / height;

    RayTracer.result = new Vector3

    let fov: i32 = 30;
    let aspectRatio: f64 = <f64>width / <f64>height;
    // console.debug(aspectRatio);
    let angle: f64 = Math.tan((Math.PI * 0.5 * fov) / 180);
    let rayDir: Vector3 = new Vector3()

    for (let y: i32 = 0; y < height; y++) {
      for (let x: i32 = 0; x < width; x++) {
        let xx: f64 = (2 * ((x + 0.5) * invWidth) - 1) * angle * aspectRatio;
        let yy: f64 = (1 - 2 * ((y + 0.5) * invHeight)) * angle;

        rayDir.x = xx
        rayDir.y = yy
        rayDir.z = -1.0

        rayDir.normalize();

        let pixelColor = RayTracer.trace(
          rayOrigin,
          rayDir,
          0,
          elements,
          backgroundColor,
        );
        // convert pixel to bytes
        let r = <u8>nearest(min(1, pixelColor.x) * 255);
        let g = <u8>nearest(min(1, pixelColor.y) * 255);
        let b = <u8>nearest(min(1, pixelColor.z) * 255);
        setPixel(x, y, r, g, b);
        // memory.free(changetype<usize>(rayDir));
        // memory.free(changetype<usize>(pixelColor));
      }
    }
    // memory.free(changetype<usize>(rayOrigin));
  }
}
