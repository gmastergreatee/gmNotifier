(function (window) {
    'use strict'
    /**
     * GMNotifier Library
     * Copyright gmastergreatee 2019
     * https://github.com/gmastergreatee
     * 
     * Instructions to use
     * 
     * - Import jQuery
     * - Then import this library, make sure to import it inside the BODY tag, or it won't work
     * There are 2 methods in this library :
     * 1- setPosition(position, appearFrom)
     *      where position can be any one of the following:
     *          - topLeft
     *          - topCenter
     *          - topRight
     *          - leftCenter
     *          - rightCenter
     *          - bottomLeft
     *          - bottomCenter
     *          - bottomRight
     *      and appearFrom can be any one of the following:
     *          - top
     *          - bottom
     *          - left
     *          - right
     *  2- notify(text, timeout)
     *      where text will/may contain either raw html or text to be put into the notification
     *      and timeout will be the integer value in milliseconds, after which the notification will be removed
     *          - putting this 0 will stop the notification from disappearing
     *          - leaving this empty will default to a timeout of 2500 milliseconds
     * 
     *  CODE EXAMPLE
     *  ============
     *
     *  // this is needed to be set only once, or may be changed later as the user requires
     *  gmNotifier.setPosition('topLeft', 'left');
     *  gmNotifier.notify('New notification');
     *  gmNotifier.notify('2nd notification', 1000);
     * 
     *  More features to come in the future
     */


    // change this to suit ur needs
    let lineHeight = '24px';
    // change this to suit ur needs
    let flyInDuration = 500;
    // change this to suit ur needs
    let notificationWidth = 350;

    // DON'T change this
    let body = $();
    let absoluteDiv = $();
    let marginSide = 'right';
    let invertAddPosition = false;
    let hAlign = 'flex-end';
    let vAligh = 'flex-end';
    let currentPosition = 'bottomRight';

    let animFirstHalf = 0;
    let animLastHalf = 0;

    /**
     * Defining gmNotifier
     */
    function define_gmNotifier() {
        let gmNotifier = {};
        initializeAllFunctions(gmNotifier);
        return gmNotifier;
    }

    function initializeAllFunctions(gmNotifier) {
        body = $('body');
        if (body.length > 0) {
            absoluteDiv = $('<div id="gm-notifier"></div>');
            absoluteDiv.css('justify-content', vAligh).css('align-items', hAlign);
            body.append(absoluteDiv);

            animFirstHalf = (flyInDuration / 2) + (flyInDuration % 2);
            animLastHalf = flyInDuration / 2;

            setPosition('bottomRight', 'right');
            absoluteDiv.css('justify-content', vAligh).css('align-items', hAlign);

            gmNotifier.setPosition = (position = 'bottomLeft', appearFrom = 'right') => {
                setPosition(position, appearFrom);
                absoluteDiv.css('justify-content', vAligh).css('align-items', hAlign);
                return gmNotifier;
            }

            gmNotifier.notify = (text, timeout = 2500) => {
                notify(text, timeout);
                return gmNotifier;
            };
        }
    }

    /**
     * Sets the position of the notification box
     * @param {The position of notifier} position 
     * @param {The position from where to appear from} appearFrom
     */
    function setPosition(position = '', appearFrom = '') {
        switch (position) {
            case 'topLeft':
                absoluteDiv.removeAttr('style').css('top', '0').css('left', '0');
                hAlign = 'flex-start';
                vAligh = 'flex-start';
                invertAddPosition = true;
                marginSide = appearFrom;
                currentPosition = "topLeft";
                break;
            case 'topCenter':
                absoluteDiv.removeAttr('style').css('top', '0').css('left', '0').css('right', '0');
                hAlign = 'center';
                vAligh = 'flex-start';
                invertAddPosition = true;
                marginSide = appearFrom;
                currentPosition = "topCenter";
                break;
            case 'topRight':
                absoluteDiv.removeAttr('style').css('top', '0').css('right', '0');
                hAlign = 'flex-end';
                vAligh = 'flex-start';
                invertAddPosition = true;
                marginSide = appearFrom;
                currentPosition = "topRight";
                break;
            case 'bottomLeft':
                absoluteDiv.removeAttr('style').css('bottom', '0').css('left', '0');
                hAlign = 'flex-start';
                vAligh = 'flex-end';
                invertAddPosition = false;
                marginSide = appearFrom;
                currentPosition = "bottomLeft";
                break;
            case 'bottomCenter':
                absoluteDiv.removeAttr('style').css('bottom', '0').css('left', '0').css('right', '0');
                hAlign = 'center';
                vAligh = 'flex-end';
                invertAddPosition = false;
                marginSide = appearFrom;
                currentPosition = "bottomCenter";
                break;
            case 'bottomRight':
                absoluteDiv.removeAttr('style').css('bottom', '0').css('right', '0');
                hAlign = 'flex-end';
                vAligh = 'flex-end';
                invertAddPosition = false;
                marginSide = appearFrom;
                currentPosition = "bottomRight";
                break;
            case 'leftCenter':
                absoluteDiv.removeAttr('style').css('top', '0').css('bottom', '0').css('left', '0');
                hAlign = 'flex-start';
                vAligh = 'center';
                invertAddPosition = false;
                marginSide = appearFrom;
                currentPosition = "leftCenter";
                break;
            case 'rightCenter':
                absoluteDiv.removeAttr('style').css('top', '0').css('bottom', '0').css('right', '0');
                hAlign = 'flex-end';
                vAligh = 'center';
                invertAddPosition = false;
                marginSide = appearFrom;
                currentPosition = "rightCenter";
                break;
            default:

        }
    }

    /**
     * Displays the notification
     * @param {The text to be displayed in the notification} text 
     * @param {The time-out after which the notification is to be destroyed, if 0, then won't be destroyed automatically} timeout 
     */
    function notify(text, timeout) {
        let notification = $('<div class="gm-notifier-item"><span class="actual-text">' + text + '</span><span class="gm-notifier-hide">X</span></div>');
        if (marginSide == 'left' || marginSide == 'right') {
            if (currentPosition.toLowerCase().includes('left'))
                notification.css('margin-left', marginSide == 'left' ? '-100%' : '100%');
            else
                notification.css('margin-right', marginSide == 'right' ? '-100%' : '100%');
        }
        if (marginSide == 'top' || marginSide == 'bottom') {
            if (currentPosition.toLowerCase().includes('top'))
                notification.css('margin-top', marginSide == 'top' ? '-100%' : '100%');
            else
                notification.css('margin-bottom', marginSide == 'bottom' ? '-100%' : '100%');
        }

        notification.css('width', notificationWidth + 'px');
        if (!invertAddPosition)
            absoluteDiv.prepend(notification);
        else
            absoluteDiv.append(notification);

        if (marginSide == 'left' || marginSide == 'right') {
            if (currentPosition.toLowerCase().includes('left'))
                notification.animate({
                    'margin-left': '0',
                    'opacity': '1',
                    'line-height': lineHeight,
                    'padding': '10px'
                }, flyInDuration);
            else
                notification.animate({
                    'margin-right': '0',
                    'opacity': '1',
                    'line-height': lineHeight,
                    'padding': '10px'
                }, flyInDuration);
        }

        if (currentPosition.toLowerCase().includes('top')) {
            $('.gm-notifier-item').css('margin-bottom', '10px');
        } else {
            $('.gm-notifier-item').css('margin-top', '10px');
        }

        if (marginSide == 'top' || marginSide == 'bottom') {
            if (currentPosition.toLowerCase().includes('top')) {
                notification.animate({
                    'margin-top': '0',
                    'opacity': '1',
                    'line-height': lineHeight,
                    'padding': '10px'
                }, flyInDuration);
            }
            else {
                notification.animate({
                    'margin-bottom': '0',
                    'opacity': '1',
                    'line-height': lineHeight,
                    'padding': '10px'
                }, flyInDuration);
            }
        }

        if (currentPosition == 'leftCenter' || currentPosition == 'rightCenter') {
            $('.gm-notifier-item').css('margin-top', '10px');
        }

        if (timeout > 0) {
            setTimeout(() => {
                notification.find('.gm-notifier-hide').remove();
                notification.animate({
                    'height': '0',
                    'opacity': '0',
                    'line-height': '0px'
                }, animFirstHalf, () => {
                    notification.animate({
                        'padding': '0',
                        'margin': '0'
                    }, animLastHalf, () => {
                        notification.remove();
                    });
                });
            }, timeout);
        }
    }

    $(document).on('click', '.gm-notifier-hide', (el) => {
        let notification = $($(el.currentTarget).parents('div')[0]);
        notification.find('.gm-notifier-hide').remove();
        notification.animate({
            'height': '0',
            'opacity': '0',
            'line-height': '0px'
        }, animFirstHalf, () => {
            notification.animate({
                'padding': '0',
                'margin-bottom': '0'
            }, animLastHalf, () => {
                notification.remove();
            })
        });
    });

    // Initialization code
    if (typeof (gmNotifier) === 'undefined') {
        window.gmNotifier = define_gmNotifier();
    }

})(window);