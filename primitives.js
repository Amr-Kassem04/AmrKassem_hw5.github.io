const Cpos = new Float32Array([
  -1, -1,  1,   1, -1,  1,   1,  1,  1,  -1,  1,  1,
   1, -1, -1,  -1, -1, -1,  -1,  1, -1,   1,  1, -1,
  -1,  1,  1,   1,  1,  1,   1,  1, -1,  -1,  1, -1,
  -1, -1, -1,   1, -1, -1,   1, -1,  1,  -1, -1,  1,
   1, -1,  1,   1, -1, -1,   1,  1, -1,   1,  1,  1,
  -1, -1, -1,  -1, -1,  1,  -1,  1,  1,  -1,  1, -1
]);

const Cnorm = new Float32Array([
  0, 0, 1,  0, 0, 1,  0, 0, 1,  0, 0, 1,
  0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
  0, 1, 0,  0, 1, 0,  0, 1, 0,  0, 1, 0,
  0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  1, 0, 0,  1, 0, 0,  1, 0, 0,  1, 0, 0,
  -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0
]);

const Cind = new Uint16Array([
  0, 1, 2,   0, 2, 3,
  4, 5, 6,   4, 6, 7,
  8, 9, 10,  8, 10, 11,
  12, 13, 14, 12, 14, 15,
  16, 17, 18, 16, 18, 19,
  20, 21, 22, 20, 22, 23
]);

const CcolData = [];
const CcolData2 = [];
const CcolData3 = [];

for (let i = 0; i < 24; i++) {
  CcolData.push(0.2, 0.2, 0.2);
  CcolData2.push(0.7, 0.7, 0.7);
  CcolData3.push(0.4, 0.4, 0.4);
}

const Ccol = new Float32Array(CcolData);
const Ccol2 = new Float32Array(CcolData2);
const Ccol3 = new Float32Array(CcolData3);

const Ctex = new Float32Array([
  0, 1,  1, 1,  1, 0,  0, 0,
  0, 1,  1, 1,  1, 0,  0, 0,
  0, 1,  1, 1,  1, 0,  0, 0,
  0, 1,  1, 1,  1, 0,  0, 0,
  0, 1,  1, 1,  1, 0,  0, 0,
  0, 1,  1, 1,  1, 0,  0, 0
]);




//Sphere
const Svert = [];
const Sind = [];
const Scol = [];
const Hcol = [];
const Stex = [];
const r = 1.0;
const SvSteps = 10;
const SuSteps = 10;
for (let i = 0; i <= SvSteps; i++) {
  const v = i * Math.PI / SvSteps;
  const sinv = Math.sin(v);
  const cosv = Math.cos(v);
  for (let j = 0; j <= SuSteps; j++) {
  const u = j * 2 * Math.PI / SuSteps;
  const sinu = Math.sin(u);
  const cosu = Math.cos(u);
  const x = cosu * sinv;
  const y = cosv;
  const z = sinu * sinv;
  Svert.push(r * x, r * y, r * z);
  Scol.push((.5), (.5), (.5));
  Hcol.push((.2), (.2), (.2));

  const texU = (j / SuSteps + 0.26) % 1.0;
  const texV = i / SvSteps;
  Stex.push(texU, texV);
  }
}

for (let i = 0; i < SvSteps; i++) {
  for (let j = 0; j < SuSteps; j++) {
    const k1 = (i * (SuSteps + 1)) + j;
    const k2 = k1 + SuSteps + 1;
    Sind.push(k1, k2, k1 + 1);
    Sind.push(k2, k2 + 1, k1 + 1);
  }
}
const Snorm = [];
for (let i = 0; i < Svert.length; i += 3) {
  const x = Svert[i], y = Svert[i + 1], z = Svert[i + 2];
  const len = Math.hypot(x, y, z);
  Snorm.push(x / len, y / len, z / len);
}




//cylinder
const cylvert = [];
const cylcol = [];
const cylind = [];
const cyltex = [];

cylr = 1.0;   
const h = 4.0;   
uSteps = 32; 
vSteps = 10;  

for (let i = 0; i <= vSteps; i++) {
  const v = i / vSteps;
  for (let j = 0; j <= uSteps; j++) {
    const u = j * 2 * Math.PI / uSteps;
    const x = cylr * Math.cos(u);
    const y = h * v;  
    const z = cylr * Math.sin(u);
    cylvert.push(x, y, z);
    cylcol.push(0.5, 0, 0);
    const texU = j / uSteps;
    const texV = v;
    cyltex.push(texU, texV);  
  }
}

for (let i = 0; i < vSteps; i++) {
  for (let j = 0; j < uSteps; j++) {
    const k1 = i * (uSteps + 1) + j;
    const k2 = k1 + (uSteps + 1);

    cylind.push(k1, k2, k1 + 1);
    cylind.push(k2, k2 + 1, k1 + 1);
  }
}

const cylnorm = [];
for (let i = 0; i <= vSteps; i++) {
  for (let j = 0; j <= uSteps; j++) {
    const u = j * 2 * Math.PI / uSteps;
    const nx = Math.cos(u);
    const ny = 0;
    const nz = Math.sin(u);
    cylnorm.push(nx, ny, nz);
  }
}


//donut
const Dvert = [];
const Dind = [];
const Dcol = [];
const Dbigr = 1.0;
const Dlilr = .5;
const DvSteps = 20;
const DuSteps = 20;
const Dtex = [];
for (let i = 0; i <= DvSteps; i++) {
  const v = i *2 * Math.PI / DvSteps;
  const sinv = Math.sin(v);
  const cosv = Math.cos(v);
  for (let j = 0; j <= DuSteps; j++) {
  const u = j * 2 * Math.PI / DuSteps;
  const sinu = Math.sin(u);
  const cosu = Math.cos(u);
  const x = Dlilr *sinv;
  const y = (Dbigr + Dlilr *cosv)* sinu;
  const z = (Dbigr + Dlilr *cosv)* cosu;
  Dvert.push(x,y,z);
  // const r = (Math.sin(u) + 1) / 2;
  // const g = (Math.sin(v) + 1) / 2;
  // const b = (Math.cos(u+v) + 1) / 2;
  Dcol.push(1, 1, 1);
  const texU = j / DuSteps ;
  const texV = (i / DvSteps+ 0.4) % 1.0;;
  Dtex.push(texU, texV);

  }
}

for (let i = 0; i < DvSteps; i++) {
  for (let j = 0; j < DuSteps; j++) {
    const k1 = (i * (DuSteps + 1)) + j;
    const k2 = k1 + DuSteps + 1;
    Dind.push(k1, k2, k1 + 1);
    Dind.push(k2, k2 + 1, k1 + 1);
  }
}

const Dnorm = [];
for (let i = 0; i <= DvSteps; i++) {
  const v = i * 2 * Math.PI / DvSteps;
  const sinv = Math.sin(v);
  const cosv = Math.cos(v);
  for (let j = 0; j <= DuSteps; j++) {
    const u = j * 2 * Math.PI / DuSteps;
    const sinu = Math.sin(u);
    const cosu = Math.cos(u);

    const nx = sinv * cosu;
    const ny = cosv;
    const nz = sinv * sinu;
    const len = Math.hypot(nx, ny, nz);
    Dnorm.push(nx / len, ny / len, nz / len);
  }
}


//floor
const Pvert = [];
const Pind = [];
const Pcol = [];
const Pnorm = [];
const Ptex = [];

const floorSize = 50;
const floorY = -6;


Pvert.push(
  -floorSize, floorY, -floorSize, 
   floorSize, floorY, -floorSize,
   floorSize, floorY,  floorSize,
  -floorSize, floorY,  floorSize 
);

Pcol.push(
  1, 1, 1,
  1, 1, 1,
  1, 1, 1,
  1, 1, 1
);

Pnorm.push(
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0
);

Ptex.push(
  1, 1,              
  0, 1,      
  0, 0,  
  1, 0
);

Pind.push(
  0, 1, 2,
  0, 2, 3
);
