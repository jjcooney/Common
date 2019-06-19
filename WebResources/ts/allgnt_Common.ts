/// <reference path="../lib/@types/xrm/index.d.ts" />
/// <reference path="allgnt_Configuration_Manager.ts" />
module Common {
    let __context: any;

    if (typeof __context !== typeof executionContext.GetGlobalContext() && typeof Xrm !== "undefined") {
        __context = Xrm.Page;
    } else if (typeof __context === "undefined" && typeof executionContext !== "undefined") {
        __context = executionContext.getFormContext();
    }


    //Generic Class object with code repeaded accross all scripts.
    export function FormatGuid(guid: string) {
        return guid.replace(/[\{\}]/g, "");
    }
    export function ToggleFieldDisplay(fieldname: string, toggle: boolean) {

        if (__context.getControl(fieldname))
            __context.getControl(fieldname).setVisible(toggle);
    }
    export function ToggleFieldRequirement(fieldname: string, toggle: string) {
        if (__context.getAttribute(fieldname))
            __context.getAttribute(fieldname).setRequiredLevel(toggle);
    }
    export function SetFieldDefaultValueIfEmpty(fieldname: string, value: any) {
        if (__context.getAttribute(fieldname) && __context.getAttribute(fieldname).getValue() === null) {
            __context.getAttribute(fieldname).setValue(value);
        }
    }
    export function ToggleDisplayBasedOnAmountInExcess(amount: number, fieldToCheck: string, fieldToSet: string) {
        let display = __context.getAttribute(fieldToCheck) && __context.getAttribute(fieldToCheck).getValue() > amount; // ? true : false;
        ToggleFieldDisplay(fieldToSet, display);
    }
    export function ToggleTabDisplay(tabname: string, display) {
        if (__context.ui.tabs.get(tabname))
            __context.ui.tabs.get(tabname).setDisplayState(display);
    }
    export function ToggleRequirementAndDisplayBasedOnAmountInExcess(amount: number, fieldToCheck: string, fieldToSet: string) {
        let display = __context.getAttribute(fieldToCheck).getValue() > amount ? true : false;
        let level = __context.getAttribute(fieldToCheck).getValue() > amount ? "required" : "none";
        ToggleFieldDisplay(fieldToSet, display);
        ToggleFieldRequirement(fieldToSet, level);
    }
    export function ToggleLockOnAllFields(display: boolean) {
        __context.ui.controls.forEach(function (control, index) {
            let controlType = control.getControlType();
            if (controlType !== "iframe" && controlType !== "webresource" && controlType !== "subgrid" && control.getName() !== "quotenumber") {
                if (control.setDisabled)
                    control.setDisabled(display);
            }
        });
    }
    export function ToggleSection(tabName: string, sectionName: string, setVisible: boolean) {
        var tab = __context.ui.tabs.get(tabName);
        if (!tab) return;
        var section = tab.sections.get(sectionName);
        if (!section) return;

        section.setVisible(setVisible);
    }
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
    export function ToggleLockOnField(fieldname: string, lock: boolean) {
        if (__context.getControl(fieldname))
            __context.getControl(fieldname).setDisabled(lock);
    };

}