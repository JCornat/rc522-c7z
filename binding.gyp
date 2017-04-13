{
  "targets": [
    {
      "target_name": "rc522",
      "sources": [
        "src/rc522.c",
        "src/rfid.c",
        "src/accessor.cpp"
      ],
      "libraries": [
        "-lbcm2835"
      ]
    }
  ]
}