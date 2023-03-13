import * as React from 'react';
// import { sampleSearchData } from './constants';
import { CreativePlayer } from '../src/components/composite/CreativePlayer'
import sample from './sample.pdf';
export default {
    component: CreativePlayer,
    title: "CreativePlayer",
    argTypes: {
        id:'creative', src:'', toggleMediaStatus: () => {}, type:"video"
    }
};

const Template = (args: any) => <CreativePlayer {...args} />;

export const DocumentPlayer = () => (
    <div>
        <CreativePlayer
            id='creative'
            src={sample}
            toggleMediaStatus={() => {}}
            type="document"
            // height={500}
            // width={300}
        />
    </div>
);

export const VideoPlayer = () => (
    <div style={{ height: '422px', width: '740px' }}>
        <CreativePlayer
            id='creative'
            src={'https://www.youtube.com/watch?v=4WMBw2hX12o'}
            toggleMediaStatus={() => {}}
            type="Video"
            currentMediaCount={1}
            totalMediaCount={3}
            playerProps={{
                isPlaying: false,
                thumbnailStatus: false,
                setMediaInstanceProgress: () => {},
                seekToStart: 0,
            }}
            // height={400}
            // width={800}
        />
    </div>
);

export const ImagePlayer = () => (
    <div style={{ height: '422px', width: '740px' }}>
        <CreativePlayer
            id='creative'
            src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgcAAABhCAMAAAB1TfJnAAAAz1BMVEX///8AAADKysrs7OxLS0vV1dVra2vY2NhISEiioqJ+fn6wsLD09PT6+vqJiYlCQkLn5+fvyUrRrixgYGAjIyPq6uqRkZG+vr7g4OBmZmZycnLouz5UVFTpwELuzE3y0lT43Fz952T342Dx2FbpzkvixUPZvDfQqibJoh/BmRa8kQ61iQarq6vOzs4NDQ0wMDCdnZ01NTUdHR0WFhZzazpqXy5jVSVbSxrmtiPqwC5xYzTvyjv931n01UX64FD/7mfs0Tziwy3YtBfNpgCvfwDoy+e3AAAQKklEQVR4nMWd60IcNxJGGWPHGA+GxNgGL9ms15f4gsFcDLuskzi7ef9nWmame6amdapUJTXd3z+Qpi/qI6lUKkkbE6Gbv7X610ZWO+eTVEc7+R/OtLmf/PSL75eLn6//9Czw04W200e/t0p9Am8W1+5Uu/vT4nKb677zAU5OT59uH7944Lqo/OHNzwEOXsKdz/ecr/Ii/e2+86czdTiY/BD47VyjcrAHmQ8CD+/loNX+0XH+8vIHEQ4e0x1feF8lrRFrHyKnLgehxmSmUTk4hsxPAg8f5WCmo+NN+6Iyc4CDgwu42UvvmxycwK+3vb8GDvwELjQqB7uQ+UztRFKVcHDbKjw3+x6ZNcDBFtzpxP0mX/BJ3T8HDiYP/b/eGJeDA8wdaA3LOLjVY+OiMt/Nz63+nXkULCn/pzgNP+a6gIOLQIUal4PnmPup/+GLOZgc6Z2DzHbzo5ODe3QTfx/9gJ/Sb+0BB5GCHJWDnTPMfeLnuJyDyana7MhcXg6m6ajv9jv4hz5aOT/zXoA4mDx3339UDj4r2f2tYQUHuiEl89z82Mrm4Ae4/oX7I67fU8rdoiAHgZIckwMab8+zux++igMNBJnFycEjunzAzgHnwUL3vU0KczD57H6E8Th4Rm3pXF7fSyUHypeSOXwcYO8eGf9qNWIy8bm+VA7O3X3seByolcDfr1VycI5OJZnDxcEODX93A35R5SPO5KVJu8R97zOMx8GRnt9bhpUccLMrM7g4wELyVuSZyJ3W6NQ7PaFdwAvSaBygB62RtxBrOcCWR6bf/L3Vf9SHwCHjI+cbzEU+5VZOK0NvUpy24mgcGJXA7VCt5oBmM2TyzS9ZDvALhKZ52J3WyOkEMLoWH0mjcWA0B5N955CrnoPD9KIy2cEBVeb9zBTGutid1srXMRgc+ApzLA4UD1oj5yRJPQfg+pWpl7+00jjAiYHAkPFW7E5rdey6hsGBbxxuc/Bld4t1H2IutLy7h8CBXQmOXC9PHNBDnBptTzojKFNvchw8pGtGhoyKfREtCosDVzdrc6ArHfKeRCIHdqxuYTK58LkQgAN6iOnDe194Iuf2qZM7ydSbby0Hv/ETUAiS3w82l+48WMjVx5gceKzWUg7AkxoZKunOA/eTbyAH6hTfZ8UqT1y3MvHy2+tGzAF9w1B92NB9yq1c3hSbA0c/OxIHuUrgi8mKcKAEDKWeFpl4+e0fjZADpNnXodvXkNKj+oQyHOxn2RyHg2cUvBO/WIwDnthKnIoy0eZgj3oFdwhSo8NcSbiKIsNB3jU3DgdcNaVcrWGQA75t93Vlms0B9jSRONtbTbMl4SIrxwENkNc0Dge6T7nVhecyUQ6wO+pa9zLt8lXLwe/pxXDIE+kcZ+KAtDWdOizFLAe5ijUKBzja6sjjQghzQMGkW508Ms3iAMd7sSHj7bgpXyNcRZHnIHOVUTiwnQcLeVrDMAfUIHRbHplmcMCrVtxF0MhTIzxXdXBwYRbNKByokQfysR3u0DgHVIk79rhMunz1z0YJB1Bwk4vgkNHrsM17Uxwc2AOPMTjIeNAaOSbK4hw8gxt1SlkmXf7xqlGXg7pVK62mqU/5FAYQeW+KhwOzXRmDA7jny7TjdrSGcQ6mEDPSCd6SSSoH2J4H1p00AufB4U76v9PshVwcWA84AgfwopOCT7pRwsEOjPU67yuTVA5ohiuyHrER1P17NBzN9jc+Dow2dgQOoBJsUzhCPli3gAOwzws4QEPXHxTaCpwH+1PqcrLeFCcHJ2rxjMAB/PQeLXnN16+CfgEmec1+YSmZBSfNoytLN9DI2Mb28jTnW3ZyoPsihueAHpkvmH2QfuzEzsBEJq3aA8nBlCZLw0NG/fkLisLLgRq4OjwH4EGbNXvYW2QU54BmdTqeYJnE/ULtqpVW8PHmG1jAeCoX6ObmQCvUwTmgHnr2S7QeM4pzAIbZeSeLTEMOMLIyPGTcwBox71x20mCJ/YwLgThQXJU8Hzo4B9C3bmlPkivcMAcPoEXvtpQy7fKP1I/0sHKrgqV2YKn84nODdynjTSEOdpRJXfxOg3MA77ggFGaFc61hmAOqIl1bXKYRB7RqpWDIiHHKTSgTeCe6syAdodGlLCDdJ6NzcA7SNq8NDYNHzpjJUQ5wuGfOO6cckD85tJnPUjDX0dZ6pe/Uxca3sjaAAueG5gAMtbbWa92lriAHOMeb9LwyMZ1fqF+10mozrRHnrbEZLgplEKZM6MEc3tAcgLOstQKgNcwMxkIcbGJNTm8hExMOYHu7gs3J5iKf8vJZ0zR7jx2FA21aOwV3aA7Sn63W5ILdZF8zwMHmI2WZQGI+y8TLV22c6u/qazsjihOZnk0Y15juSoUDNdwpudjAHLAHrRF0Z3Zch5ODhy++qFGA6bhfpq7ilb/P02o3OhDaS615sUWYWU4gjQMtwCHZ13FgDqBbWKEJRWOv9+1hPVNaujK1wwH6k0uGjBtZ6OFGVlGoHGihoN1ghGE5ALeudOPARU0XQg8cpJa+TO1wQMaBe4eBjmBhjWzLYDBhFYXOgWYrdgJXh+UAnknawZbpRKrnACxnmXz5WnKAIUixbQqXAufBlqzwQd+ywYEWGb8+ABmUgylYgrIcp+ABs1rDeg7AxJPJN5KDPlatLJWpEbhizvAtWxxQqc609p0H5QD613WfRtChevf7YLx+0+g7r1opGzLeDuigi1nvsQEUw01hcaBusCD7xEE5MDxoCwEo1kYQtRyge0JmEBzgUPwiuGplKWj2Ow+jzsOgTA60tXPSVhySA/Cgdb15UOeMCd1KDngST+a4aTF481tvs4xzQbF3Gz7gTnch2BxotqKoY0NyYPiUWynBCYoqOeAHljm+Ljn4ftDHYsZW4JZMtkMGX4XuTclwwP4vecEhOcjHBpLbw9hLso4D5T1llhUHf/YUqb6QZ2AEY2zdt5zjQNnDePX8A3IAz5pOgcLz6iOzKg60Rlbm+frmbaM/+5xp9LX5ERdCjgM1YKkt3AE5gIYubfOh1uk2eQUHu+ogTOZa4wDrVOgcoVawzBIWGzm60aWyHGi24lkzch6QAwjgSKv6Xtpz6ut9yzl4okc2yGxrHNTvn9sKrCC4DEXqadTlOdBWVje24nAcwCiWjhUD75faGpZysGvN3cmM6xz44lgcAucB9S/wbTS3lYMDbQ+abe1ed8SB0zGSH1mvVMbBrm3cyaxf365xwPs2hM49mQnixbB7gaLQvCkeDvDooEkzYB2MA1pBQq6BKUzAaH15EQe5tUEyb5cD3CM+t9VIIjVEsytwCCt2qYsDXHcxWfTOg3FAlQAzBhyqRRzk9jOTeb++fdfov4vEXuYY6BKPSdD8KBS7ONAWms92XB2MA+idtvHlobZox5MCB0dPpQ7JxM+clyOzJhzwhgWxwWN2hzRLW9wL+TjgOJp5iQzFAYwDAlIKOr+PZsG5RTLn13ddDnAblMhhC/k9A22xievkgH0gM1txKA6qKoH25RxxaegFNEP9ZMaUA568i8QkOXZIs8SubC8H2g5lj6CduxMOFFvVKWW9ryc+EWuAZeLLfMABt60B/7LSNnuFq1D8HODJchNcBHcXHLj2gzLEz+ThgHZAMU18me8KOMD4nsBhg9apGx4hcm4O1FPyUt0FB5WVQGkNXfHKiKBh4stsV+9+aiQ4QFPHPXisrRE8yvJz4P8Ud8FBdh/djDhUwBe3ji+um/gyF3JQt6bJs2egLWp6Ahy4D9W4Aw7sUzc8wtbQuX6B3Ay6iS9zXbUY/PQ/maVmWxztAAC/iLgIB44tnee6Aw7qz3XBmCwnB5vkR1NDSGQmhQM8QuXMNXj07RloiiLlQxyQaxfUPwfaSvyA0AvoXdeGg1bPub4aB7gHgis4qc55sBAURYgDp43SPwd1zoOFaL2ve30jDR5PlOlsmUfjoHyBWw8lQXPUMQ4c+907XyfGQR+VgF7LzQEeuarM3cksV7+26nDAr5Rf8Or6ADmdpZZikAOXtdo7B3v2YUxOgR3mX++MXkDeUkDm0DmgaVHHYYtOEy2j9AtFOfBUzd45sI7s9Ataw8C6d9cRHHPJDDoH7I/JzWn7tzUzlYanhTmgpWUd9c5BD8tRJ+iyi+yDQW48dFfLDAYHRcc6O07d8Cj1poQ5sE+RnatvDqo9aI1SAz/CASyi4bhPmX716/tWaUbcMMscPLpO3fAoWewX5yBvvPfNQU+VAD5aaF8c7+BRJq84+JBmhO0aMgseoUacHj/KCWy6JCCjgIPsd+mbA7jF8+zLH4NtmbSGsX2y0Ea29z+4em9wwGRZ63Jh+OpwR9Ngp/vYJRzkbMWeOQhEW0pB95uUWYyDHbJT7icmgky1OWC3hD5zAX481wku2TXyhRxM7W6qZw4C0ddSYI8nDtXgvnmwpzsMQ2RihgOczNdXthTWCDLpuht3FnGQsRV75gDu4PHE066z3TtE99F0rVmWaVfvPzT6iBdEE1gdPBp7BtrKbB+yUcqBPf/XLwcwcPetEobWsFvCvZzfaJ3TleOAbS2lAPnUDY+A304kXCEHpmunXw4i65PWBK14d71vmAOcaesEdsikLAfolkiWsC+U/5rqY6e/PF+/RykHWuDqTL1yQH2y6wE9BMX33Ucv4LrRJVOuP+Q4OCATwR095T3CJtujFHNguDR65cC3pBOV71EKDvfKh5DIhOsPH1tpF3TPacOn6h79oCq7X0IxB7zt01y9cgCfynueFQV4Zy+e3caOBo9rE3gyId8eKP5leAzH6E8vitQZuj7iLOdAtxX75AAMatr1nZXdRKiEA5zqkV5A+f9Ve/BJvyI5rLeSIRHFTfvXQeU8UBUcqHPhfXJQ5kFrlB1vFx36iK8tPBry3y4OfNsigGWiLdfz3WOtPtVwoNmKPXJA2wQGFgPmfMtFHPBrr64r/3v90cGBb/Do2CHNEPlCZXlXcaAscuqRg+hGuR3lutQyDnBly6ohl//1ccBLU9Z7Bjp1I39890oZe7uOAzxVok8OYOgXqAS4l6Qs3jIOuCFf+qjkP50coH95vQurrBG5D13HAftF++MAdvg5CS0NBoeqHG0UcmD7l+X/Vhz8ZV4Qo9HXZlFK1w8uhUdBL1XJAY5+++Og3IPmu0ApB9ghnja7s8j/XX/81MjmAAeP8jBlCNE8ix3jYp/MUcsBvUB/HIS2hiVBqId0yRdzgM6TpiGX/3JzgINHsWaqukZk5uuqOQAbpzcOKnzKxm2Er66YAx48Lka08j9+DnAKd+X+BAMienCDOX9fz0HqquqNA8eMYU727mnlHBj728h/XH/ycmDbHHRkZ3QDTtObUs/BxkG36+qLg9ypGx5NoQFfdQwVHFB4w2JTU/mPAAc4p92umarxKS8FXc/SF9MDBwlofXGQPXXDIzM8rYIDfX8b+bfgIFt9MSD6cP4zcqfFD/uDolg2r31w0KW1Lw6ggsRPsTHD02o4UPe3kX9ef/qrVb4Z190S0KQXHO9lzdX0wkHni/XEAcyRhTxojaBjWLaGVRzwGrOD/wNNX3yhYVgN9QAAAABJRU5ErkJggg=='}
            toggleMediaStatus={() => {}}
            type="image"
            // height={97}
            // width={519}
        />
    </div>
);

export const DefaultProps = Template.bind({});
