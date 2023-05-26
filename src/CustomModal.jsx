import * as React from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    Modal
} from '@fluentui/react';
import { DefaultButton } from '@fluentui/react/lib/Button';

export const CustomModal = ({ btnText, header, modalBody }) => {

    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)
    const titleId = useId('title');

    return (
        <span>
            <DefaultButton onClick={showModal} text={btnText} style={{ padding: '0px 5px', minWidth: '40px' }} />
            <Modal
                titleAriaId={titleId}
                isOpen={isModalOpen}
                onDismiss={hideModal}
                isBlocking={true}
                containerClassName={contentStyles.container}
            >
                <div className={contentStyles.header}>
                    <h2 className={contentStyles.heading} id={titleId}>
                        {header} &nbsp;
                    </h2>
                    <DefaultButton
                        styles={iconButtonStyles}
                        style={{ minWidth: '30px', float: 'right' }}
                        onClick={hideModal}
                        text="X"
                        id='closeModal'
                    />
                </div>
                <div className={contentStyles.body}>
                    {modalBody}
                </div>
            </Modal>
        </span>
    );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        minWidth: '600px'
    },
    header: [
        theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `0px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: FontWeights.semibold,
            padding: '5px 5px 6px 6px',
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        fontSize: 'inherit',
        margin: '0',
    },
    body: {
        flex: '4 4 auto',
        padding: '0 12px 12px 12px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '12px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
});
const iconButtonStyles = {
    root: {
        color: theme.palette.neutralPrimary,
        margin: '0px',
        padding: '0px'
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};
