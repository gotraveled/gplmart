# Shot list + prompt patterns

## Prompt skeleton (every shot)

```
Professional e-commerce product photograph of [PRODUCT], [SHOT TYPE].
Same product as the reference photo: identical shape, colours, label text and proportions.
[BACKGROUND]. [LIGHTING]. Shot on [CAMERA STYLE].
No extra objects, no text overlays, no watermark, no distorted or invented label text.
```

## Per-shot patterns

- **Hero white**: "pure white seamless background, soft even lighting, product centred, slight 3/4 angle, commercial catalogue style"
- **45-degree**: "three-quarter angle showing front and side, white background, gentle shadow"
- **Macro**: "extreme close-up of [material/texture detail], shallow depth of field, studio lighting"
- **Flat lay**: "top-down flat lay on [surface], minimal styling props, editorial catalogue style"
- **Lifestyle**: "product in realistic use context ([scene]), natural light, authentic not staged"
- **Scale**: "product held in human hand for scale" / "product beside common object for size reference"

## Prompt engineering tips

- Describe the product's distinguishing features explicitly ("ridged golden potato chips in a sealed pouch") - vague prompts drift
- For label-heavy products: add "label facing camera, text large and legible" or choose angles avoiding small text
- Negative phrasing works inconsistently - prefer positive composition descriptions
- One shot per generation - never ask for "multiple angles in one image"
