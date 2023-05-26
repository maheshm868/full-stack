import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import {
    // PrimaryButton,
    DefaultButton
} from '@fluentui/react/lib/Button';
// import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import {
    useId,
    // useBoolean
} from '@fluentui/react-hooks';

const dialogStyles = { main: { maxWidth: 450 } };
const dialogContentProps = {
    type: DialogType.normal, //close or largeHeader
    title: 'Message',
    closeButtonAriaLabel: 'Close',
    subText: 'SubMessage',
};

export const CustomDialog = (props) => {
    
    const labelId = useId('dialogLabel');
    const subTextId = useId('subTextLabel');

    const modalProps = React.useMemo(
        () => ({
            titleAriaId: labelId,
            subtitleAriaId: subTextId,
            isBlocking: false,
            styles: dialogStyles,
        }),
        [labelId, subTextId,],
    );

    return <Dialog
        hidden={props.hideDialog}
        onDismiss={props.toggleHideDialog}
        dialogContentProps={{ ...dialogContentProps, subText: props.subText, title: props.title }}
        modalProps={modalProps}
    >
        <DialogFooter>
            {/* <PrimaryButton onClick={props.toggleHideDialog} text="Ok" /> */}
            <DefaultButton onClick={props.closeBtnHandler} text="Close" />
        </DialogFooter>
    </Dialog>
};
