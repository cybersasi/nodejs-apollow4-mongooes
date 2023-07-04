import * as util from "util";
import { exec as lameExec } from "child_process";
const exec = util.promisify(lameExec);
const log = console.log.bind(console);

// Top level await works now
const { stdout, stderr } = await exec("ls -la");
log("Output:\n", stdout);
log("\n\nErrors:\n", stderr);