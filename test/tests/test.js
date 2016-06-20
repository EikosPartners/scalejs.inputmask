import 'scalejs.inputmask';
import ko from 'knockout';
import $ from 'jquery';
import 'chai';

describe("Inputmask tests", function () {
    it("Expect inputmask to be defined in ko bindingHandlers", function() {
        expect(ko.bindingHandlers['inputmask']).to.be.defined;
    });
    it("Expect inputmask to be defined in jquery plugins", function() {
        expect($['inputmask']).to.be.defined;
    });
});
