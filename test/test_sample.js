import { describe, it } from "mocha";
import { expect } from "chai";

describe("Test example", function() {
  it("Add", function(done) {
    expect(2 + 3).to.equal(5);
    done();
  });
});
