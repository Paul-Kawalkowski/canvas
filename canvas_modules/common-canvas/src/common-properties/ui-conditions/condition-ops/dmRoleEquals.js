/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import logger from "./../../../../utils/logger";
import { getMetadataFieldMatch } from "./../conditions-utils.js";

function op() {
	return "dmRoleEquals";
}


/**
 * Find the metadata for the given field and return if it matches the given data role
 * @param {Object} paramInfo first entry in the globals row, and the name of the desired field is a string attribute
 * @param {Object} paramInfo2 alternate parameter for the target data role. Use value instead if possible.
 * @param {Object} value the target role type we are comparing the field to
 * @param {Object} controller properties controller
 */
function evaluate(paramInfo, param2Info, value, controller) {
	if (paramInfo.control.role !== "column") {
		logger.warn("Condition Operator dmRoleEquals only intended for use on columns");
	}
	const metadata = controller.getDatasetMetadataFields();
	var target = null;
	if (param2Info !== null && typeof param2Info !== "undefined" && param2Info.value !== null) {
		if (param2Info.control.role === "column") {
			target = getMetadataFieldMatch(param2Info, metadata, "modeling_role");
		}
		if (target === null) {
			target = param2Info.value;
		}
	} else if (value !== null && typeof value !== "undefined") {
		target = value;
	} else {
		return false;
	}
	if (!metadata) {
		return false;
	}
	if (typeof paramInfo.value === "string" || typeof paramInfo.value === "object") {
		var fieldRole = getMetadataFieldMatch(paramInfo, metadata, "modeling_role");
		return fieldRole === target;

	} else if (typeof paramInfo.value !== "undefined") {
		logger.warn("dmRoleEquals cannot handle the given type: " + typeof paramInfo.value);
	}
	return false;
}

// Public Methods ------------------------------------------------------------->

module.exports.op = op;
module.exports.evaluate = evaluate;
