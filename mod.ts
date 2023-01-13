let libSuffix = "";
switch (Deno.build.os) {
  case "windows":
    libSuffix = "dll";
    break;
  case "darwin":
    libSuffix = "dylib";
    break;
  default:
    libSuffix = "so";
    break;
}

let path = `./target/debug/libhd.${libSuffix}`;

export class Hello {
  //@ts-ignore: testing
  dylib: Deno.DynamicLibrary;
  constructor() {
    this.dylib = Deno.dlopen(
      path,
      {
        hello: { parameters: [], result: "void" },
        hello_ptr: { parameters: [], result: "pointer" },
      } as const,
    );
  }

  hello() {
    this.dylib.symbols.hello();
  }

  helloPtr(): string {
    const r = this.dylib.symbols.hello_ptr();
    const dv = new Deno.UnsafePointerView(r);
    return dv.getCString();
  }

  close() {
    this.dylib.close();
  }
}
