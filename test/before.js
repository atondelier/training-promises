"use strict";

import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chaiAsPromised from "chai-as-promised";

chai.should();
chai.use(sinonChai);
chai.use(chaiAsPromised);

global.sinon = sinon;
global.expect = chai.expect;
