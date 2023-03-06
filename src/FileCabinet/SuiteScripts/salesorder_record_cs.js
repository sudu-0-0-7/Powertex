/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
    /**
     * @param{record} record
     */
    function (record) {
        function pageInit() {

        }

        function completeTransaction(curtRecId, invoiceSearchResultCount, itemFulfillmentsearchResultCount) {
            try {
                if (itemFulfillmentsearchResultCount == 0) {
                    log.debug("inside second if", '');
                    var itemFulfillmentRecord = record.transform({
                        fromType: 'salesorder',
                        fromId: curtRecId,
                        toType: 'itemfulfillment',
                        isDynamic: true
                    });
                    itemFulfillmentRecord.save();
                }

                if (invoiceSearchResultCount == 0) {
                    var invoiceRecord = record.transform({
                        fromType: 'salesorder',
                        fromId: curtRecId,
                        toType: 'invoice',
                        isDynamic: true,
                    });
                    invoiceRecord.save();
                }
            }
            catch (e) {
                log.error("error in beforeload", e.message);
                return false;
            }
        }

        return {
            pageInit: pageInit,
            completeTransaction: completeTransaction
        };

    });
