const sidebarTree = (title = 'About') => ({
    '/code/': [
        {
            'title':       'theory',
            'collapsable': true,
            'children':    [
                'theory/PitchClass',
                'theory/Note',
                'theory/MusicalPattern',
                'theory/Chord',
                'theory/Scale',
                'theory/GuitarChordPattern',
            ],
        },
        {
            'title':       'notation',
            'collapsable': true,
            'children':    [
                'notation/Measure',
                'notation/Score',
                'notation/ScoreHandler',
            ],
        },
        {
            'title':       'utilities',
            'collapsable': true,
            'children':    [
                'utilities/ScientificFunctions',
                'utilities/MusicFunctions',
                'utilities/GeneralFunctions',
                'utilities/PureMusicUtils',
            ],
        },
    ],
})


module.exports = {
    contentLoading: true,
    title:          'Note-Art API',
    description:    'The API for Note-Art JS',
    locales:        {
        '/': {
            title:       'Note-Art JS',
            description: 'Music Theory in code',
        },
    },
    themeConfig:    {
        sidebarDepth: 0,
        repo:         'seanitzel/note-art',
        locales:      {
            '/': {
                nav:     [
                    {
                        text: 'Home',
                        link: '/',
                    },
                    {
                        text: 'Demo',
                        link: 'https://note-art-demo.netlify.com/',
                    },
                ],
                // Add the generated sidebar
                sidebar: {
                    ...sidebarTree(),
                },
            },
        },
    },
}
