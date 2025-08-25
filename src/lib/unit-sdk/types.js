"use strict";
// HyperUnit API Types
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperUnitError = exports.OperationState = void 0;
// Operation States
var OperationState;
(function (OperationState) {
    OperationState["SrcTxDiscovered"] = "sourceTxDiscovered";
    OperationState["WaitForSrcTxFinalization"] = "waitForSrcTxFinalization";
    OperationState["BuildingDstTx"] = "buildingDstTx";
    OperationState["SignTx"] = "signTx";
    OperationState["BroadcastTx"] = "broadcastTx";
    OperationState["WaitForDstTxFinalization"] = "waitForDstTxFinalization";
    OperationState["ReadyForWithdrawQueue"] = "readyForWithdrawQueue";
    OperationState["QueuedForWithdraw"] = "queuedForWithdraw";
    OperationState["Done"] = "done";
    OperationState["Failure"] = "failure";
})(OperationState || (exports.OperationState = OperationState = {}));
// Custom error class
class HyperUnitError extends Error {
    constructor(message, status, code, details) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
        this.name = "HyperUnitError";
    }
}
exports.HyperUnitError = HyperUnitError;
//# sourceMappingURL=types.js.map