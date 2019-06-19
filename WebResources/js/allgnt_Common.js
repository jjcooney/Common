/// <reference path="../lib/@types/xrm/index.d.ts" />
/// <reference path="allgnt_Configuration_Manager.ts" />
var Common;
(function (Common) {
    var __context;
    if (typeof __context !== typeof executionContext.GetGlobalContext() && typeof Xrm !== "undefined") {
        __context = Xrm.Page;
    }
    else if (typeof __context === "undefined" && typeof executionContext !== "undefined") {
        __context = executionContext.getFormContext();
    }
    //Generic Class object with code repeaded accross all scripts.
    function FormatGuid(guid) {
        return guid.replace(/[\{\}]/g, "");
    }
    Common.FormatGuid = FormatGuid;
    function ToggleFieldDisplay(fieldname, toggle) {
        if (__context.getControl(fieldname))
            __context.getControl(fieldname).setVisible(toggle);
    }
    Common.ToggleFieldDisplay = ToggleFieldDisplay;
    function ToggleFieldRequirement(fieldname, toggle) {
        if (__context.getAttribute(fieldname))
            __context.getAttribute(fieldname).setRequiredLevel(toggle);
    }
    Common.ToggleFieldRequirement = ToggleFieldRequirement;
    function SetFieldDefaultValueIfEmpty(fieldname, value) {
        if (__context.getAttribute(fieldname) && __context.getAttribute(fieldname).getValue() === null) {
            __context.getAttribute(fieldname).setValue(value);
        }
    }
    Common.SetFieldDefaultValueIfEmpty = SetFieldDefaultValueIfEmpty;
    function ToggleDisplayBasedOnAmountInExcess(amount, fieldToCheck, fieldToSet) {
        var display = __context.getAttribute(fieldToCheck) && __context.getAttribute(fieldToCheck).getValue() > amount; // ? true : false;
        ToggleFieldDisplay(fieldToSet, display);
    }
    Common.ToggleDisplayBasedOnAmountInExcess = ToggleDisplayBasedOnAmountInExcess;
    function ToggleTabDisplay(tabname, display) {
        if (__context.ui.tabs.get(tabname))
            __context.ui.tabs.get(tabname).setDisplayState(display);
    }
    Common.ToggleTabDisplay = ToggleTabDisplay;
    function ToggleRequirementAndDisplayBasedOnAmountInExcess(amount, fieldToCheck, fieldToSet) {
        var display = __context.getAttribute(fieldToCheck).getValue() > amount ? true : false;
        var level = __context.getAttribute(fieldToCheck).getValue() > amount ? "required" : "none";
        ToggleFieldDisplay(fieldToSet, display);
        ToggleFieldRequirement(fieldToSet, level);
    }
    Common.ToggleRequirementAndDisplayBasedOnAmountInExcess = ToggleRequirementAndDisplayBasedOnAmountInExcess;
    function ToggleLockOnAllFields(display) {
        __context.ui.controls.forEach(function (control, index) {
            var controlType = control.getControlType();
            if (controlType !== "iframe" && controlType !== "webresource" && controlType !== "subgrid" && control.getName() !== "quotenumber") {
                if (control.setDisabled)
                    control.setDisabled(display);
            }
        });
    }
    Common.ToggleLockOnAllFields = ToggleLockOnAllFields;
    function ToggleSection(tabName, sectionName, setVisible) {
        var tab = __context.ui.tabs.get(tabName);
        if (!tab)
            return;
        var section = tab.sections.get(sectionName);
        if (!section)
            return;
        section.setVisible(setVisible);
    }
    Common.ToggleSection = ToggleSection;
    //#region Grid Logic Needs Types
    // export function ToggleLockOnAllGrids (display : boolean) {
    //     var addRebate = __context.getAttribute("allgnt_doyouwanttoaddrebates");
    //     __context.ui.controls.forEach(function (control, index) {
    //         var controlType = control.getControlType();
    //         if (controlType === "subgrid") {//FutureLocations //ROFutureLocations //PaintSpecialPricing //ROPaintSpecialPricing //MaterialSpecialPricing //ROMaterialSpecialPricing //Variable_Rebate2 //ROVariableRebate //FixedRebate //ROFixedRebate //ColorFees //ROColorFees
    //             let name = control.getName();
    //             if (name === "PrimaryAccount" || name === "AdditionalCRCs") return;
    //             if (name.startsWith("RO"))
    //                 export function ToggleFieldDisplay(control.getName(), display);
    //             else
    //                 export function ToggleFieldDisplay(control.getName(), !display);
    //         }
    //     });
    // };
    //#endregion
    function ToggleLockOnField(fieldname, lock) {
        if (__context.getControl(fieldname))
            __context.getControl(fieldname).setDisabled(lock);
    }
    Common.ToggleLockOnField = ToggleLockOnField;
    ;
})(Common || (Common = {}));
//# sourceMappingURL=allgnt_Common.js.map