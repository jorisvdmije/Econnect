"use client";

import React from "react";
import { Button } from "./ui/button";
const EmailButton = () => {
  const handleEmailButtonClick = () => {
    const subject = encodeURIComponent(
      "Onderwerp: Vraag over tarieven voor Module Opdracht"
    );
    const body = encodeURIComponent(
      "Beste Meneer/Mevrouw,\n\n Ik heb gemerkt dat het tarief voor de Module Opdracht op jullie website anders is dan wat ik momenteel ontvang. Op jullie website staat vermeld dat het tarief voor deze opdracht [hun tarief], terwijl ik momenteel [eigenlijk tarief] ontvang. Zou je me kunnen voorzien van verduidelijking over dit verschil en de meest recente tarieven?\n\n Met vriendelijke groet,\n Monique van Wonderen"
    );

    const mailtoUrl = `mailto:econect@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  };

  return <Button onClick={() => handleEmailButtonClick()}>Send Email</Button>;
};

export default EmailButton;
