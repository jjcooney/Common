"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigurationManager;
(function (ConfigurationManager) {
    var __context;
    var optObject = new Array();
    function OnLoad(executionContext) {
        __context = executionContext.getFormContext();
        if (typeof __context === "undefined" && typeof Xrm !== "undefined")
            __context = Xrm.Page;
        if (!__context) {
            alert("The current page has encountered and issue, please try refreshing the page.  If this issue continues please contact support for assistance.");
            return;
        }
        SetOnChangeEvents();
        ToggleConfigurationType();
        ToggleStatic();
    }
    ConfigurationManager.OnLoad = OnLoad;
    function OnSave(executionContext) {
        PreventAutoSave(executionContext);
    }
    ConfigurationManager.OnSave = OnSave;
    ;
    function PreventAutoSave(executionContext) {
        //Disable Auto Save Logic
        // 'https://docs.microsoft.com/en-us/dynamics365/customer-engagement/customize/manage-auto-save'
        var eventArgs = executionContext.getEventArgs();
        if (eventArgs.getSaveMode() === 70 || eventArgs.getSaveMode() === 2) {
            eventArgs.preventDefault();
        }
    }
    function SetOnChangeEvents() {
        if (__context.getAttribute("allgnt_configurationtype"))
            __context.getAttribute("allgnt_configurationtype").addOnChange(ToggleConfigurationType);
        if (__context.getAttribute("allgnt_linkstatic"))
            __context.getAttribute("allgnt_linkstatic").addOnChange(ToggleStatic);
        if (__context.getAttribute("allgnt_associatedentity"))
            __context.getAttribute("allgnt_associatedentity").addOnChange(ShowAssociatedEntityLookup);
    }
    function ToggleConfigurationType() {
        var config = __context.getAttribute("allgnt_configurationtype");
        if (!config)
            return;
        var displayLink = config.getValue() === 0; // ? true : false;//rewritten
        var displayCalculation = config.getValue() === 1; // ? true : false;
        var displayMetric = config.getValue() === 2; // ? true : false;
        Common.ToggleSection("General", config.getOptions()[0].text, displayLink);
        Common.ToggleSection("General", config.getOptions()[1].text, displayCalculation);
        Common.ToggleSection("General", config.getOptions()[2].text, displayMetric);
    }
    function ShowAssociatedEntityLookup() {
        var showAssociatedEntity = __context.getAttribute("allgnt_associatedentity");
        if (!showAssociatedEntity || showAssociatedEntity.getValue() === null)
            return;
        Common.ToggleFieldDisplay("allgnt_associatedentitylookup", showAssociatedEntity.getValue());
        if (!showAssociatedEntity.getValue())
            __context.getAttribute("allgnt_associatedentitylookup").setValue(null);
    }
    function ToggleStatic() {
        var isStatic = __context.getAttribute("allgnt_linkstatic");
        if (!isStatic)
            return;
        Common.ToggleFieldDisplay("Link_Parameters", !isStatic.getValue());
    }
})(ConfigurationManager || (ConfigurationManager = {}));
//# sourceMappingURL=allgnt_Configuration_Manager.js.map